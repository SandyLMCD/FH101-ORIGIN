import React from 'react';
import AppView from './AppView.jsx';
import { api } from './api/client.js';

/**
 * FH101 ORIGIN — application controller.
 *
 * Holds all UI state, talks to the Express API through `api`, and builds the
 * view-model bag `v` consumed by the presentational components in ./screens
 * and ./components. This mirrors the structure of the original prototype's
 * logic class so the two can be diffed side by side.
 */
export default class App extends React.Component {
  constructor(props){
    super(props);
    // Reference lists are loaded from GET /api/categories (via /api/bootstrap).
    this.areas0=[];this.programs=[];this.sems=[];this.sys=[];
    this.state={loaded:false,error:null,
      papers:[],screen:'landing',hist:[],role:'student',q:'',
      filters:{program:null,sy:null,sem:null,area:null},sort:'Newest first',
      bookmarks:{'CAP-0200-0139-2021':'f1','THE-0100-0045-2021':''},
      folders:[{id:'f1',name:'RRL candidates'}],activeFolder:'all',renamingId:null,renameText:'',
      detailCode:'CAP-0200-0147-2021',citeOpen:false,citeFmt:'APA 7',citation:'',
      rdCode:'CAP-0200-0147-2021',rdPage:1,rdZoom:100,rdQ:'',
      subStep:0,subFile:'',ocr:'idle',
      subMeta:{title:'',authors:'',program:'',sy:'2025–2026',sem:'2nd Semester',area:'',adviser:'',abstract:'',keywords:'',areaOther:''},
      subs:[],
      qFilter:'Under review',reviewId:1,remarksOpen:false,remarks:'',editMeta:false,
      upStep:0,upFile:'',upOcr:'idle',
      upMeta:{title:'',authors:'',program:'',sy:'2019–2020',sem:'1st Semester',area:'',adviser:'',abstract:'',keywords:''},
      anaSpan:'week',audSpan:'week',audAction:'All actions',audUser:'All users',audRange:'Last 7 days',
      users:[],audit:[],ocrJobs:[],
      catAreas:[],newArea:'',newProgram:'',theme:'dark',repoPage:1,subDetailId:1,revFile:'',revOcr:'idle',
      lastBackup:'—',backing:false,toasts:[]};
    this._tid=0;
  }
  componentWillUnmount(){clearTimeout(this._ocrTimer)}
  componentDidMount(){
    document.documentElement.setAttribute('data-theme',this.state.theme);
    api.setIdentity(this.state.role);
    this.loadBootstrap();
  }
  async loadBootstrap(){
    try{
      const d=await api.bootstrap();
      this.areas0=d.categories.areas;this.programs=d.categories.programs;this.sems=d.categories.semesters;this.sys=d.categories.schoolYears;
      this.setState({loaded:true,papers:d.papers,subs:d.submissions,users:d.users,audit:d.audit,ocrJobs:d.ocrJobs,catAreas:d.categories.areas.slice(),lastBackup:d.system.lastBackup,
        subMeta:Object.assign({},this.state.subMeta,{program:this.programs[1],area:this.areas0[4]}),
        upMeta:Object.assign({},this.state.upMeta,{program:this.programs[0],area:this.areas0[0]})});
    }catch(e){this.setState({error:e.message})}
  }
  async refreshAudit(){try{const d=await api.audit();this.setState({audit:d.rows})}catch(e){}}
  async refreshOcrJobs(){try{const d=await api.ocrJobs();this.setState({ocrJobs:d.jobs})}catch(e){}}
  logView(code){api.viewPaper(code).then(d=>this.setState(s=>({papers:s.papers.map(p=>p.code===code?d.paper:p)}))).catch(()=>{})}
  async loadCitation(code,fmt){try{const d=await api.citation(code,fmt);this.setState({citation:d.citation})}catch(e){this.toast(e.message)}}
  fail(e){this.toast(e&&e.message?e.message:'Request failed')}
  toggleTheme(){const t=this.state.theme==='dark'?'light':'dark';this.setState({theme:t});document.documentElement.setAttribute('data-theme',t)}
  toast(m){const id=++this._tid;this.setState(s=>({toasts:s.toasts.concat({id,m})}));setTimeout(()=>this.setState(s=>({toasts:s.toasts.filter(t=>t.id!==id)})),2600)}
  nav(screen,extra){this.setState(s=>Object.assign({hist:s.hist.concat(s.screen),screen,citeOpen:false},extra||{}));if(screen==='audit')this.refreshAudit();if(screen==='backup')this.refreshOcrJobs()}
  back(){this.setState(s=>{const h=s.hist.slice();const prev=h.pop();return prev?{screen:prev,hist:h,citeOpen:false}:{}})}
  setRole(r){const home={student:'repo',coordinator:'queue',adviser:'queue',admin:'users'}[r];api.setIdentity(r,{student:'svillarin',coordinator:'lbartolome',adviser:'msalcedo',admin:'rocampo'}[r]);this.setState(s=>({role:r,hist:s.hist.concat(s.screen),screen:home,citeOpen:false}))}
  toggleBm(code){const has=code in this.state.bookmarks;this.setState(s=>{const b=Object.assign({},s.bookmarks);if(has)delete b[code];else b[code]='';return{bookmarks:b}});this.toast(has?'Bookmark removed':'Bookmarked')}
  /** Kick off an OCR job on the backend and poll until it completes. `key` is the state field holding idle|processing|done. */
  async startOcr(key,file){this.setState({[key]:'processing'});
    try{const {job}=await api.startOcr(file);
      const poll=async()=>{const {job:j}=await api.ocrJob(job.id);if(j.status==='Processing'){this._ocrTimer=setTimeout(poll,500)}else{this.setState({[key]:'done'});this.refreshOcrJobs()}};
      poll()}
    catch(e){this.setState({[key]:'idle'});this.fail(e)}}
  pillView(st){const m={'Under review':['var(--wait)','rgba(242,180,65,0.1)'],'Approved':['var(--ok)','rgba(63,203,142,0.1)'],'Published':['var(--ok)','rgba(63,203,142,0.1)'],'Returned':['var(--stop)','rgba(255,107,107,0.1)'],'Active':['var(--ok)','rgba(63,203,142,0.1)'],'Suspended':['var(--stop)','rgba(255,107,107,0.1)'],'Complete':['var(--ok)','rgba(63,203,142,0.1)'],'Failed':['var(--stop)','rgba(255,107,107,0.1)'],'Processing':['var(--proc)','rgba(91,155,255,0.1)']};const p=m[st]||['var(--text-low)','transparent'];return{stWord:st.toUpperCase(),stC:p[0],stBg:p[1]}}
  filteredPapers(){const s=this.state;const q=s.q.trim().toLowerCase();const f=s.filters;
    let L=s.papers.filter(p=>{if(f.program&&p.program!==f.program)return false;if(f.sy&&p.sy!==f.sy)return false;if(f.sem&&p.sem!==f.sem)return false;if(f.area&&p.area!==f.area)return false;
      if(!q)return true;return p.title.toLowerCase().indexOf(q)>=0||p.authors.join(' ').toLowerCase().indexOf(q)>=0||p.keywords.join(' ').toLowerCase().indexOf(q)>=0});
    const yr=p=>parseInt(p.sy.slice(0,4),10);
    if(s.sort==='Newest first')L=L.slice().sort((a,b)=>yr(b)-yr(a));
    else if(s.sort==='Oldest first')L=L.slice().sort((a,b)=>yr(a)-yr(b));
    else if(s.sort==='Title A–Z')L=L.slice().sort((a,b)=>a.title.localeCompare(b.title));
    else if(s.sort==='Most accessed')L=L.slice().sort((a,b)=>b.views-a.views);
    return L}
  cardView(p){const s=this.state;const has=p.code in s.bookmarks;
    return{code:p.code,title:p.title,authorsStr:p.authors.join(', '),meta:p.program+' · SY '+p.sy+' · '+p.sem+' · '+p.area,
      bmLabel:has?'SAVED':'SAVE',bmBg:has?'rgba(46,123,255,0.12)':'transparent',bmBorder:has?'var(--azure-500)':'var(--line)',bmColor:has?'var(--azure-400)':'var(--text-low)',
      open:()=>{this.nav('detail',{detailCode:p.code});this.logView(p.code)},
      toggleBm:e=>{if(e&&e.stopPropagation)e.stopPropagation();this.toggleBm(p.code)},
      folderId:s.bookmarks[p.code]||'',
      folderOpts:s.folders.map(f=>({id:f.id,name:f.name})),
      move:e=>{e.stopPropagation();const v=e.target.value;this.setState(st=>{const b=Object.assign({},st.bookmarks);b[p.code]=v;return{bookmarks:b}});this.toast('Moved to folder')},
      remove:e=>{e.stopPropagation();this.toggleBm(p.code)}}}
  facetsView(){const s=this.state;const defs=[['program','Program',this.programs],['sy','School year',Array.from(new Set(s.papers.map(p=>p.sy))).sort()],['sem','Semester',this.sems],['area','Area of research',Array.from(new Set(s.papers.map(p=>p.area)))]];
    return defs.map(d=>{const key=d[0];return{label:d[1],opts:d[2].map(o=>{const act=s.filters[key]===o;return{name:o,x:act?'  ×':'',bg:act?'rgba(46,123,255,0.12)':'transparent',bd:act?'var(--azure-500)':'var(--line)',c:act?'var(--azure-400)':'var(--text-mid)',pick:()=>this.setState(st=>{const nf=Object.assign({},st.filters);nf[key]=act?null:o;return{filters:nf,repoPage:1}})}})}})}
  metaFieldsView(objKey){const defs=[['title','Title','text'],['authors','Authors (comma-separated)','text'],['program','Program','select',this.programs],['sy','School year','select',this.sys],['sem','Semester','select',this.sems],['area','Area of research','select',this.areas0],['adviser','Adviser','text'],['abstract','Abstract','area'],['keywords','Keywords (comma-separated)','text']];
    const obj=this.state[objKey];
    return defs.map(d=>{const areaField=d[0]==='area'&&objKey==='subMeta';
      const opts=(d[3]||[]).concat(areaField?['Others']:[]);
      return{label:d[1],value:obj[d[0]],isText:d[2]==='text',isSelect:d[2]==='select',isArea:d[2]==='area',options:opts.map(v=>({v})),
      showOther:areaField&&obj.area==='Others',otherValue:obj.areaOther||'',
      onOtherChange:e=>{const v=e.target.value;this.setState(s=>{const no=Object.assign({},s[objKey]);no.areaOther=v;return{[objKey]:no}})},
      onChange:e=>{const v=e.target.value;this.setState(s=>{const no=Object.assign({},s[objKey]);no[d[0]]=v;return{[objKey]:no}})}}})}
  matchPages(q,tot){if(!q||!q.trim())return[];const seed=q.trim().toLowerCase().split('').reduce((a,c)=>a+c.charCodeAt(0),0)%7;const out=[];for(let p=1;p<=tot;p++){if((p+seed)%7===3)out.push(p)}return out}
  pageLines(page,hitPages,hasQ){const L=[];for(let i=0;i<20;i++){const r=Math.abs(Math.sin(page*37+i*11));
    const w=(i===0?54+r*8:(i===19?32+r*40:84+r*14));
    const hit=hasQ&&hitPages.indexOf(page)>=0&&(i%6===2);
    L.push({w:w.toFixed(1)+'%',hlL:(10+r*50).toFixed(0)+'%',hlW:hit?(9+r*8).toFixed(0)+'%':'0%',hlBg:hit?'rgba(46,123,255,0.45)':'transparent'})}
    return L}
  gotoHit(dir){const s=this.state;const rdP=s.papers.find(p=>p.code===s.rdCode)||s.papers[0];const hp=this.matchPages(s.rdQ,rdP.pages);if(!hp.length)return;
    let t=dir>0?hp.filter(p=>p>s.rdPage)[0]:hp.filter(p=>p<s.rdPage).slice(-1)[0];
    if(t==null)t=dir>0?hp[0]:hp[hp.length-1];this.setState({rdPage:t})}
  async submitPaper(){const m=this.state.subMeta;
    try{const {submission}=await api.createSubmission(Object.assign({},m,{file:this.state.subFile,submitter:'Sandy Villarin'}));
      this.setState(s=>({subs:[submission].concat(s.subs),subStep:0,subFile:'',ocr:'idle',subMeta:Object.assign({},s.subMeta,{title:'',authors:'',adviser:'',abstract:'',keywords:'',areaOther:''})}));
      this.toast('Paper submitted');this.nav('mysubs')}
    catch(e){this.fail(e)}}
  async publishUpload(){const m=this.state.upMeta;
    try{const {paper}=await api.publishPaper(Object.assign({},m,{file:this.state.upFile}));
      this.setState(s=>({papers:[paper].concat(s.papers),upStep:0,upFile:'',upOcr:'idle',upMeta:Object.assign({},s.upMeta,{title:'',authors:'',adviser:'',abstract:'',keywords:''})}));
      this.toast('Published to repository');this.nav('repo')}
    catch(e){this.fail(e)}}
  reviewerName(){return this.state.role==='adviser'?'Engr. Ma. Teresa Salcedo (Adviser)':'Prof. Liezel Bartolome (Coordinator)'}
  async approve(id){try{const {submission}=await api.approveSubmission(id);
    this.setState(s=>({subs:s.subs.map(x=>x.id===id?submission:x),remarksOpen:false}));this.toast('Approved and published')}catch(e){this.fail(e)}}
  async sendReturn(id){const r=this.state.remarks.trim();if(!r){this.toast('Add remarks before returning');return}
    try{const {submission}=await api.returnSubmission(id,r);
      this.setState(s=>({subs:s.subs.map(x=>x.id===id?submission:x),remarksOpen:false,remarks:''}));this.toast('Returned for revision')}catch(e){this.fail(e)}}
  stepsView(cur){return['Upload','Metadata','Review & submit'].map((name,i)=>({n:String(i+1),name:name.toUpperCase(),c:i<=cur?'var(--azure-400)':'var(--text-low)',bd:i<=cur?'var(--azure-500)':'var(--line)',bg:i===cur?'rgba(46,123,255,0.12)':'transparent'}))}
  bars(arr){const mx=Math.max.apply(null,arr.map(a=>a[1]));return arr.map(a=>({label:a[0],v:String(a[1]),w:Math.round(a[1]/mx*100)+'%'}))}
  renderVals(){
    const s=this.state;const scr=s.screen;
    const inApp=scr!=='landing'&&scr!=='register';
    const navDefs={student:[['Repository','repo'],['Bookmarks','bookmarks'],['Submit','submit'],['My submissions','mysubs'],['Profile','profile']],
      coordinator:[['Repository','repo'],['Review queue','queue'],['Upload & index','upload'],['Analytics','analytics']],
      adviser:[['Repository','repo'],['Review queue','queue']],
      admin:[['Repository','repo'],['Users','users'],['Categories','categories'],['Audit log','audit'],['Backup','backup']]};
    const roleNames={student:'Student',coordinator:'Research Coordinator',adviser:'Adviser',admin:'System Administrator'};
    const userNames={student:'Sandy Villarin',coordinator:'Prof. Liezel Bartolome',adviser:'Engr. Ma. Teresa Salcedo',admin:'Ramil Ocampo'};
    const homes={student:'repo',coordinator:'queue',adviser:'queue',admin:'users'};
    const list=this.filteredPapers();
    const cards=list.map(p=>this.cardView(p));
    const anyActive=!!(s.filters.program||s.filters.sy||s.filters.sem||s.filters.area);
    const perPage=6;const totalPg=Math.max(1,Math.ceil(cards.length/perPage));const pgN=Math.min(s.repoPage,totalPg);
    const pagedCards=cards.slice((pgN-1)*perPage,pgN*perPage);
    const pageBtns=[];for(let i=1;i<=totalPg;i++){const act=i===pgN;pageBtns.push({n:String(i),bg:act?'rgba(46,123,255,0.12)':'transparent',bd:act?'var(--azure-500)':'var(--line)',c:act?'var(--azure-400)':'var(--text-mid)',pick:(x=>()=>this.setState({repoPage:x}))(i)})}
    const pageInfo=cards.length?('Showing '+((pgN-1)*perPage+1)+'–'+Math.min(pgN*perPage,cards.length)+' of '+cards.length):'';
    const prevPage=()=>this.setState({repoPage:Math.max(1,pgN-1)});
    const nextPage=()=>this.setState({repoPage:Math.min(totalPg,pgN+1)});
    const dpP=s.papers.find(p=>p.code===s.detailCode)||s.papers[0];
    const rdP=s.papers.find(p=>p.code===s.rdCode)||s.papers[0];
    const hitPages=this.matchPages(s.rdQ,rdP.pages);
    const bmAll=Object.keys(s.bookmarks);
    const bmCodes=bmAll.filter(c=>s.activeFolder==='all'||(s.bookmarks[c]||'')===s.activeFolder);
    const bmCards=bmCodes.map(c=>s.papers.find(p=>p.code===c)).filter(Boolean).map(p=>this.cardView(p));
    const folderRows=[{id:'all',name:'All bookmarks',count:String(bmAll.length),canRename:false}].concat(s.folders.map(f=>({id:f.id,name:f.name,count:String(bmAll.filter(c=>s.bookmarks[c]===f.id).length),canRename:true}))).map(f=>{
      const act=s.activeFolder===f.id;const ren=s.renamingId===f.id;
      return{id:f.id,name:f.name,count:f.count,canRename:f.canRename&&!ren,renaming:ren,notRenaming:!ren,
        bg:act?'var(--ink-600)':'transparent',c:act?'var(--text-hi)':'var(--text-mid)',
        pick:()=>this.setState({activeFolder:f.id}),
        del:e=>{e.stopPropagation();this.setState(st=>{const b={};Object.keys(st.bookmarks).forEach(c=>{b[c]=st.bookmarks[c]===f.id?'':st.bookmarks[c]});return{folders:st.folders.filter(x=>x.id!==f.id),bookmarks:b,activeFolder:st.activeFolder===f.id?'all':st.activeFolder}});this.toast('Folder deleted')},
        startRename:e=>{e.stopPropagation();this.setState({renamingId:f.id,renameText:f.name})},
        renameVal:s.renameText,setRenameVal:e=>this.setState({renameText:e.target.value}),
        commitRename:()=>{const v=s.renameText;this.setState(st=>({folders:st.folders.map(x=>x.id===f.id?Object.assign({},x,{name:(v||'').trim()||x.name}):x),renamingId:null}));this.toast('Folder renamed')}}});
    const mySubs=s.subs.filter(x=>x.mine).map(x=>{const pv=this.pillView(x.status);
      const done='var(--ok)',off='var(--text-low)';
      const steps=[{name:'Submitted',c:done},
        {name:'Under review',c:x.status==='Under review'?'var(--wait)':done},
        (x.status==='Returned'?{name:'Returned',c:'var(--stop)'}:{name:'Approved & published',c:x.status==='Approved'?done:off})];
      return Object.assign({title:x.title,date:x.date,returned:x.status==='Returned',remarks:x.remarks,
        steps:steps.map((t,i)=>({name:t.name.toUpperCase(),c:t.c,tail:i<steps.length-1?'var(--line)':'transparent'})),
        open:()=>this.nav('subdetail',{subDetailId:x.id,revFile:'',revOcr:'idle'}),
        resubmit:e=>{if(e&&e.stopPropagation)e.stopPropagation();this.nav('subdetail',{subDetailId:x.id,revFile:'',revOcr:'idle'})}},pv)});
    const qBase=(s.role==='adviser')?s.subs.filter(x=>x.adviser==='Engr. Ma. Teresa Salcedo'):s.subs;
    const qTabs=['Under review','Approved','Returned'].map(t=>{const act=s.qFilter===t;const n=qBase.filter(x=>x.status===t).length;
      return{name:t+' · '+n,bg:act?'rgba(46,123,255,0.12)':'transparent',bd:act?'var(--azure-500)':'var(--line)',c:act?'var(--azure-400)':'var(--text-mid)',pick:()=>this.setState({qFilter:t})}});
    const qRows=qBase.filter(x=>x.status===s.qFilter).map(x=>Object.assign({submitter:x.submitter,title:x.title,program:x.program,date:x.date,
      open:()=>this.nav('review',{reviewId:x.id,remarksOpen:false,remarks:'',editMeta:false})},this.pillView(x.status)));
    const rvSub=s.subs.find(x=>x.id===s.reviewId)||s.subs[0];
    const rvDefs=[['title','Title','text'],['authors','Authors','text'],['program','Program','select',this.programs],['sy','School year','select',this.sys],['sem','Semester','select',this.sems],['area','Area of research','select',this.areas0],['adviser','Adviser','text'],['keywords','Keywords','text']];
    const rvFields=rvDefs.map(d=>({label:d[1],value:rvSub[d[0]]||'',isText:d[2]==='text',isSelect:d[2]==='select',isArea:false,options:(d[3]||[]).map(v=>({v})),
      onChange:e=>{const v=e.target.value;this.setState(st=>({subs:st.subs.map(x=>x.id===rvSub.id?Object.assign({},x,{[d[0]]:v}):x)}))}}));
    const rvRows=rvDefs.map(d=>({label:d[1].toUpperCase(),value:rvSub[d[0]]||'—'})).concat([{label:'ABSTRACT',value:rvSub.abstract||'—'}]);
    const rv=Object.assign({title:rvSub.title,submitter:rvSub.submitter,date:rvSub.date,
      approve:()=>this.approve(rvSub.id),openReturn:()=>this.setState({remarksOpen:true}),cancelReturn:()=>this.setState({remarksOpen:false,remarks:''}),
      sendReturn:()=>this.sendReturn(rvSub.id),remarksOpen:s.remarksOpen,remarks:s.remarks,setRemarks:e=>this.setState({remarks:e.target.value}),
      editing:s.editMeta,notEditing:!s.editMeta,toggleEdit:()=>this.setState(st=>({editMeta:!st.editMeta})),
      editLabel:s.editMeta?'Done editing':'Edit metadata',fields:rvFields,rows:rvRows,previewLines:this.pageLines(1,[],false)},this.pillView(rvSub.status));
    const sdSub=s.subs.find(x=>x.id===s.subDetailId)||s.subs.filter(x=>x.mine)[0]||s.subs[0];
    const sdRows=[['Title',sdSub.title],['Authors',sdSub.authors],['Program',sdSub.program],['School year',(sdSub.sy||'—')+' · '+(sdSub.sem||'')],['Area of research',sdSub.area],['Adviser',sdSub.adviser],['Keywords',sdSub.keywords],['Abstract',sdSub.abstract]].map(r=>({label:r[0].toUpperCase(),value:r[1]||'—'}));
    const sdNext=(sdSub.attempt||1)+1;
    const sd=Object.assign({title:sdSub.title,date:sdSub.date,attempt:String(sdSub.attempt||1),nextAttempt:String(sdNext),rows:sdRows,
      history:(sdSub.history||[]).slice().reverse().map(h=>({ts:h.ts,label:h.label,by:h.by,remarks:h.remarks||'',hasRemarks:!!h.remarks})),
      returned:sdSub.status==='Returned',revFile:s.revFile,revNoFile:!s.revFile,revHasFile:!!s.revFile,
      revProcessing:s.revOcr==='processing',revDone:s.revOcr==='done',
      revChoose:()=>{const f='Manuscript_revised_v'+sdNext+'.pdf';this.setState({revFile:f});this.startOcr('revOcr',f)},
      resubmit:()=>api.resubmit(sdSub.id,s.revFile).then(({submission})=>{this.setState(st=>({subs:st.subs.map(x=>x.id===sdSub.id?submission:x),revFile:'',revOcr:'idle'}));this.toast('Revision submitted')}).catch(e=>this.fail(e))},this.pillView(sdSub.status));
    const weekVol=[['Mon',132],['Tue',171],['Wed',149],['Thu',204],['Fri',186],['Sat',63],['Sun',41]];
    const monthVol=[['Feb',2410],['Mar',3105],['Apr',2760],['May',1930],['Jun',2245],['Jul',2891]];
    const topPapers=s.papers.slice().sort((a,b)=>b.views-a.views).slice(0,5).map(p=>({code:p.code,title:p.title.split(':')[0],views:String(p.views),w:Math.round(p.views/s.papers.reduce((m,x)=>Math.max(m,x.views),1)*100)+'%'}));
    const syCount={};s.papers.forEach(p=>{syCount[p.sy]=(syCount[p.sy]||0)+1});
    const syBars=this.bars(Object.keys(syCount).sort().map(k=>[k,syCount[k]]));
    const spanBtn=(key,val,label)=>{const act=s[key]===val;return{name:label,bg:act?'rgba(46,123,255,0.12)':'transparent',bd:act?'var(--azure-500)':'var(--line)',c:act?'var(--azure-400)':'var(--text-mid)',pick:()=>this.setState({[key]:val})}};
    const dLimit=s.audRange==='Last 7 days'?7:(s.audRange==='Last 30 days'?30:9999);
    const audRowsF=s.audit.filter(r=>r.d<=dLimit&&(s.audAction==='All actions'||r.action===s.audAction)&&(s.audUser==='All users'||r.user===s.audUser));
    const paCount={};s.audit.forEach(r=>{if(r.action==='VIEW_PAPER'&&r.code!=='—'){if(!paCount[r.code])paCount[r.code]={n:0,last:r.ts,users:{}};paCount[r.code].n++;paCount[r.code].users[r.user]=1}});
    const paperAccess=Object.keys(paCount).map(c=>{const p=s.papers.find(x=>x.code===c);return{code:c,title:p?p.title.split(':')[0]:c,n:String(paCount[c].n),users:String(Object.keys(paCount[c].users).length),last:paCount[c].last,sortN:paCount[c].n}}).sort((a,b)=>b.sortN-a.sortN);
    const userRows=s.users.map((u,i)=>Object.assign({name:u.name,email:u.email,role:u.role,last:u.last,
      setRole:e=>{const v=e.target.value;api.setUserRole(u.email,v).then(({user})=>{this.setState(st=>({users:st.users.map((x,j)=>j===i?user:x)}));this.toast('Role updated')}).catch(e=>this.fail(e))}},this.pillView(u.status)));
    const progCodes={'BS Computer Science':'0100','BS Information Technology':'0200','BS Information Systems':'0300','BS Entertainment & Multimedia Computing':'0400'};
    const progRows=this.programs.map(p=>({name:p,code:progCodes[p],count:String(s.papers.filter(x=>x.program===p).length)}));
    const areaRows=s.catAreas.map(a=>({name:a,count:String(s.papers.filter(x=>x.area===a).length)}));
    const citeTabs=['APA 7','IEEE','Harvard','MLA'].map(t=>{const act=s.citeFmt===t;return{name:t,line:act?'var(--azure-500)':'transparent',c:act?'var(--text-hi)':'var(--text-low)',pick:()=>{this.setState({citeFmt:t});this.loadCitation(dpP.code,t)}}});
    const citation=s.citation;
    const mkNav=r=>navDefs[r].map(d=>{const act=scr===d[1]||(d[1]==='repo'&&(scr==='detail'||scr==='reader'))||(d[1]==='queue'&&scr==='review')||(d[1]==='mysubs'&&scr==='subdetail');
      return{name:d[0],bg:act?'rgba(46,123,255,0.12)':'transparent',color:act?'var(--text-hi)':'var(--text-low)',go:()=>this.nav(d[1])}});
    const roleBtns=[['STUDENT','student'],['COORD','coordinator'],['ADVISER','adviser'],['ADMIN','admin']].map(d=>{const act=s.role===d[1];
      return{name:d[0],bg:act?'rgba(46,123,255,0.12)':'transparent',bd:act?'var(--azure-500)':'var(--line)',c:act?'var(--azure-400)':'var(--text-low)',pick:()=>this.setRole(d[1])}});
    return{
      isLanding:scr==='landing',isRegister:scr==='register',inApp,
      isRepo:scr==='repo',isDetail:scr==='detail',isReader:scr==='reader',isBookmarks:scr==='bookmarks',isSubmit:scr==='submit',isMySubs:scr==='mysubs',isProfile:scr==='profile',
      isSubDetail:scr==='subdetail',isQueue:scr==='queue',isReview:scr==='review',isUpload:scr==='upload',isAnalytics:scr==='analytics',
      isUsers:scr==='users',isCategories:scr==='categories',isAudit:scr==='audit',isBackup:scr==='backup',
      back:()=>this.back(),backColor:s.hist.length?'var(--text-hi)':'var(--text-low)',
      goHome:()=>this.nav(homes[s.role]),goRegister:()=>this.nav('register'),goLanding:()=>this.setState({screen:'landing',hist:[]}),
      goRepo:()=>this.nav('repo'),goSubmit:()=>this.nav('submit'),
      signIn:()=>{api.setIdentity('student','svillarin');this.setState({role:'student',screen:'repo',hist:[]});this.toast('Signed in')},
      demoStudent:()=>this.setRole('student'),
      demoCoord:()=>this.setRole('coordinator'),
      demoAdmin:()=>this.setRole('admin'),
      createAccount:()=>{this.setState({role:'student',screen:'repo',hist:[]});this.toast('Account created')},
      navItems:mkNav(s.role),userName:userNames[s.role],roleTag:roleNames[s.role],roleBtns,
      stop:e=>e.stopPropagation(),
      shellPad:inApp?'220px':'0px',
      themeLabel:'Theme · '+(s.theme==='dark'?'dark':'light'),
      toggleTheme:()=>this.toggleTheme(),
      q:s.q,setQ:e=>this.setState({q:e.target.value,repoPage:1}),facets:this.facetsView(),
      resultCount:String(cards.length)+(cards.length===1?' paper':' papers'),
      sort:s.sort,setSort:e=>this.setState({sort:e.target.value}),
      anyActive,clearAll:()=>this.setState({filters:{program:null,sy:null,sem:null,area:null},repoPage:1}),
      clearEverything:()=>this.setState({q:'',filters:{program:null,sy:null,sem:null,area:null},repoPage:1}),
      cards:pagedCards,hasResults:cards.length>0,noResults:cards.length===0,
      pageBtns,pageInfo,hasPages:totalPg>1,prevPage,nextPage,
      dp:{code:dpP.code,title:dpP.title,authorsStr:dpP.authors.join(', '),program:dpP.program,sy:dpP.sy,sem:dpP.sem,area:dpP.area,adviser:dpP.adviser,pagesStr:String(dpP.pages)+' pages',abstract:dpP.abstract,
        kws:dpP.keywords.map(k=>({k})),
        read:()=>this.nav('reader',{rdCode:dpP.code,rdPage:1,rdQ:''}),
        cite:()=>{this.setState({citeOpen:true,citation:''});this.loadCitation(dpP.code,s.citeFmt)},
        bmText:(dpP.code in s.bookmarks)?'Remove bookmark':'Save to bookmarks',
        bmBg:(dpP.code in s.bookmarks)?'rgba(46,123,255,0.12)':'transparent',bmBorder:(dpP.code in s.bookmarks)?'var(--azure-500)':'var(--line)',bmColor:(dpP.code in s.bookmarks)?'var(--azure-400)':'var(--text-hi)',
        toggleBm:()=>this.toggleBm(dpP.code),
        contacts:dpP.authors.map(n=>{const parts=n.toLowerCase().split(' ');return{name:n,email:parts[0].charAt(0)+parts[parts.length-1]+'@my.xu.edu.ph'}})},
      rd:{code:rdP.code,title:rdP.title,page:String(s.rdPage),pages:String(rdP.pages),zoom:String(s.rdZoom),
        pageW:Math.round(620*s.rdZoom/100)+'px',
        lines:this.pageLines(s.rdPage,hitPages,!!s.rdQ.trim()),
        prev:()=>this.setState(st=>({rdPage:Math.max(1,st.rdPage-1)})),
        next:()=>this.setState(st=>({rdPage:Math.min(rdP.pages,st.rdPage+1)})),
        jump:e=>{const v=Math.max(1,Math.min(rdP.pages,parseInt(e.target.value,10)||1));this.setState({rdPage:v})},
        zoomOut:()=>this.setState(st=>({rdZoom:Math.max(60,st.rdZoom-20)})),
        zoomIn:()=>this.setState(st=>({rdZoom:Math.min(180,st.rdZoom+20)})),
        q:s.rdQ,setQ:e=>this.setState({rdQ:e.target.value}),
        hasHits:hitPages.length>0,hitText:String(hitPages.length)+' pages with matches',
        prevHit:()=>this.gotoHit(-1),nextHit:()=>this.gotoHit(1)},
      citeOpen:s.citeOpen,citeClose:()=>this.setState({citeOpen:false}),citeTabs,citation,citeTitle:dpP.title.split(':')[0],
      copyCite:()=>{try{navigator.clipboard.writeText(citation)}catch(e){}this.toast('Citation copied')},
      zotero:()=>{window.open(api.zoteroUrl(dpP.code),'_blank');this.toast('Exported to Zotero')},
      folderRows,addFolder:()=>{const id='f'+Date.now();this.setState(st=>({folders:st.folders.concat({id,name:'New folder'}),renamingId:id,renameText:'New folder',activeFolder:id}))},
      bmCards,hasBm:bmCards.length>0,noBm:bmCards.length===0,
      subSteps:this.stepsView(s.subStep),sub0:s.subStep===0,sub1:s.subStep===1,sub2:s.subStep===2,
      subFile:s.subFile,hasFile:!!s.subFile,noFile:!s.subFile,
      ocrProcessing:s.ocr==='processing',ocrDone:s.ocr==='done',
      chooseFile:()=>{const f='Group7_Manuscript_Final.pdf';this.setState({subFile:f});this.startOcr('ocr',f)},
      toStep1:()=>this.setState({subStep:1}),toStep2:()=>this.setState({subStep:2}),
      backStep0:()=>this.setState({subStep:0}),backStep1:()=>this.setState({subStep:1}),
      metaFields:this.metaFieldsView('subMeta'),
      reviewRows:this.metaFieldsView('subMeta').map(f=>({label:f.label.toUpperCase(),value:(f.showOther?(f.otherValue||'Others'):f.value)||'—'})),
      submitPaper:()=>this.submitPaper(),
      mySubs,
      qTabs,qRows,hasQRows:qRows.length>0,noQRows:qRows.length===0,qFilterName:s.qFilter,
      rv,sd,
      upSteps:this.stepsView(s.upStep),up0:s.upStep===0,up1:s.upStep===1,up2:s.upStep===2,
      upFile:s.upFile,upHasFile:!!s.upFile,upNoFile:!s.upFile,
      upOcrProcessing:s.upOcr==='processing',upOcrDone:s.upOcr==='done',
      upChooseFile:()=>{const f='FH101_shelf3_scan_0044.pdf';this.setState({upFile:f});this.startOcr('upOcr',f)},
      upToStep1:()=>this.setState({upStep:1}),upToStep2:()=>this.setState({upStep:2}),
      upBackStep0:()=>this.setState({upStep:0}),upBackStep1:()=>this.setState({upStep:1}),
      upMetaFields:this.metaFieldsView('upMeta'),
      upReviewRows:this.metaFieldsView('upMeta').map(f=>({label:f.label.toUpperCase(),value:f.value||'—'})),
      publish:()=>this.publishUpload(),
      topPapers,syBars,
      volBars:this.bars(s.anaSpan==='week'?weekVol:monthVol),
      anaWeekBtn:spanBtn('anaSpan','week','WEEK'),anaMonthBtn:spanBtn('anaSpan','month','MONTH'),
      userRows,progRows,areaRows,
      newArea:s.newArea,setNewArea:e=>this.setState({newArea:e.target.value}),
      addArea:()=>{const v=s.newArea.trim();if(!v)return;api.addArea(v).then(({areas})=>{this.areas0=areas;this.setState({catAreas:areas.slice(),newArea:''});this.toast('Area added')}).catch(e=>this.fail(e))},
      paperAccess,
      audRows:audRowsF.map(r=>({ts:r.ts,user:r.user,role:r.role,action:r.action,code:r.code,ip:r.ip})),
      audCount:String(audRowsF.length)+' events',
      audAction:s.audAction,setAudAction:e=>this.setState({audAction:e.target.value}),
      audActionOpts:Array.from(new Set(s.audit.map(r=>r.action))).map(v=>({v})),
      audUser:s.audUser,setAudUser:e=>this.setState({audUser:e.target.value}),
      audUserOpts:Array.from(new Set(s.audit.map(r=>r.user))).map(v=>({v})),
      audRange:s.audRange,setAudRange:e=>this.setState({audRange:e.target.value}),
      audBars:this.bars(s.audSpan==='week'?weekVol:monthVol),
      audWeekBtn:spanBtn('audSpan','week','WEEK'),audMonthBtn:spanBtn('audSpan','month','MONTH'),
      lastBackup:s.lastBackup,backing:s.backing,notBacking:!s.backing,
      runBackup:()=>{if(this.state.backing)return;api.runBackup().then(()=>{this.setState({backing:true});const poll=async()=>{const st=await api.backupStatus();if(st.backing){setTimeout(poll,500)}else{this.setState({backing:false,lastBackup:st.lastBackup});this.toast('Backup completed');this.refreshAudit()}};poll()}).catch(e=>this.fail(e))},
      ocrJobs:s.ocrJobs.map(j=>Object.assign({file:j.file,pages:j.pages,dur:j.dur,when:j.when},this.pillView(j.status))),
      signOut:()=>{api.setIdentity('student','svillarin');this.setState({screen:'landing',hist:[],role:'student'})},
      toasts:s.toasts.map(t=>({m:t.m}))
    };
  }
  render(){
    if(this.state.error)return <Splash title="Cannot reach the FH101 ORIGIN API" detail={this.state.error+' — is the backend running on port 4000?'} />;
    if(!this.state.loaded||!this.state.papers.length)return <Splash title="Loading repository…" />;
    return <AppView v={this.renderVals()} />;
  }
}

function Splash({title,detail}){
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,background:'var(--ink-900)'}}>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--text-low)'}}>FH101 ORIGIN</div>
      <div style={{fontFamily:"'Inter Tight',sans-serif",fontSize:22,fontWeight:600,color:'var(--text-hi)'}}>{title}</div>
      {detail && <div style={{fontSize:13,color:'var(--stop)',maxWidth:480,textAlign:'center'}}>{detail}</div>}
    </div>
  );
}
