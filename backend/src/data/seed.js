/**
 * Seed data for the FH101 ORIGIN prototype API.
 *
 * This is the mock dataset that previously lived inside the single-file prototype.
 * In production these collections map to Supabase (PostgreSQL) tables:
 *   papers -> papers, submissions -> submissions, users -> profiles,
 *   audit -> audit_log, ocrJobs -> ocr_jobs, categories -> programs / research_areas.
 */

const A = ['Knowledge Management and Digital Repository Systems','Health Informatics','Geographic Information Systems','Internet of Things','Web Application Development','Machine Learning','Network Security','Digital Animation','Business Intelligence'];
const PR = ['BS Computer Science','BS Information Technology','BS Information Systems','BS Entertainment & Multimedia Computing'];

const categories = {
  areas: A,
  programs: PR,
  programCodes: {
    'BS Computer Science': '0100',
    'BS Information Technology': '0200',
    'BS Information Systems': '0300',
    'BS Entertainment & Multimedia Computing': '0400',
  },
  semesters: ['1st Semester','2nd Semester'],
  schoolYears: ['2017–2018','2018–2019','2019–2020','2020–2021','2024–2025','2025–2026'],
};

const papers = [
{code:'CAP-0200-0147-2021',title:'SERBISYO: A Web-Based Queue Management System for the Cagayan de Oro City Hall Civil Registry',authors:['Miguel Andres Uy','Katrina Mae Villanueva','Joshua Rey Pactolerin'],program:PR[1],sy:'2020–2021',sem:'2nd Semester',area:A[4],adviser:'Engr. Ma. Teresa Salcedo',abstract:'Civil registry transactions at the Cagayan de Oro City Hall rely on manual numbering that produces long, unmanaged queues. SERBISYO implements a web-based queue management system with live status boards, priority lanes, and transaction analytics for registry staff. A four-week pilot deployment reduced average client waiting time by 32% and eliminated double-issued queue numbers.',keywords:['queue management','local government','web application','service analytics'],pages:96,views:412},
{code:'THE-0100-0045-2021',title:'TANAW: A GIS-Based Flood Risk Mapping Tool for Barangay-Level Planning Along the Cagayan River',authors:['Alyssa Jane Roa','Paolo Miguel Neri'],program:PR[0],sy:'2020–2021',sem:'1st Semester',area:A[2],adviser:'Dr. Rowena Dagondon',abstract:'Barangays along the Cagayan River lack accessible flood risk information at the household level. TANAW combines LiDAR-derived elevation data with historical flood records to render barangay-level risk maps in a web GIS. Validation against the 2011 and 2017 flood events showed 87% agreement with recorded inundation extents.',keywords:['GIS','flood risk','disaster preparedness','LiDAR'],pages:112,views:388},
{code:'CAP-0200-0121-2020',title:'LINGKOD: An IoT Water Quality Monitoring System for Backyard Aquaculture in Barangay Macasandig',authors:['Rafael Antonio Yu','Bea Marie Salvana','Kenneth Jay Lumapas'],program:PR[1],sy:'2019–2020',sem:'2nd Semester',area:A[3],adviser:'Engr. Dominic Ravanera',abstract:'Backyard tilapia growers in Barangay Macasandig monitor pond conditions manually, often detecting problems only after fish kills. LINGKOD deploys low-cost sensor nodes measuring pH, temperature, and dissolved oxygen, pushing readings to a web dashboard over GSM. Field tests across three ponds produced alert lead times of two to six hours before critical thresholds were reached.',keywords:['IoT','aquaculture','water quality','sensors'],pages:104,views:245},
{code:'THE-0100-0032-2019',title:'AGILA: A Convolutional Neural Network for Rice Leaf Disease Classification in Northern Mindanao Farms',authors:['Christian Dave Abella','Maria Lourdes Tan'],program:PR[0],sy:'2018–2019',sem:'2nd Semester',area:A[5],adviser:'Dr. Ferdinand Pitagan',abstract:'Rice farmers in Northern Mindanao commonly misidentify leaf diseases, leading to wrong or delayed treatment. AGILA trains a convolutional neural network on 4,800 labeled images of local rice leaf samples to classify blast, blight, and brown spot. The model reached 91.2% test accuracy and runs on mid-range Android phones through TensorFlow Lite.',keywords:['machine learning','CNN','agriculture','image classification'],pages:98,views:501},
{code:'CAP-0300-0088-2020',title:'SIGLA: A Health Records Dashboard for Barangay Health Workers in Misamis Oriental',authors:['Hannah Grace Ebarle','Jomar Quimpan','Trisha Anne Balaba'],program:PR[2],sy:'2019–2020',sem:'1st Semester',area:A[1],adviser:'Prof. Cecilia Mabolo',abstract:'Barangay health workers in Misamis Oriental keep maternal and immunization records in paper logbooks that are hard to consolidate. SIGLA provides a dashboard for encoding visits, generating FHSIS reports, and flagging overdue immunizations. A pilot in two barangays cut monthly report preparation from three days to four hours.',keywords:['health informatics','barangay health','FHSIS','dashboard'],pages:90,views:274},
{code:'CAP-0200-0139-2021',title:'ARKIBO: A Digital Records Management System for the Xavier University College of Agriculture',authors:['Janella Marie Cuenca','Mark Vincent Odchigue'],program:PR[1],sy:'2020–2021',sem:'2nd Semester',area:A[0],adviser:'Engr. Ma. Teresa Salcedo',abstract:'The XU College of Agriculture stores research outputs and administrative records in unindexed filing cabinets. ARKIBO implements a digital records management system with controlled metadata, role-based access, and full-text retrieval. User acceptance testing with fourteen staff members yielded a System Usability Scale score of 84.',keywords:['records management','digital repository','metadata','full-text search'],pages:102,views:463},
{code:'THE-0100-0051-2021',title:'BANTAY: A Signature-Based Intrusion Detection Framework for Small Campus Networks',authors:['Lance Gabriel Amoroso','Rica Jean Pabillaran','Neil Patrick Suan'],program:PR[0],sy:'2020–2021',sem:'2nd Semester',area:A[6],adviser:'Engr. Dominic Ravanera',abstract:'Small campus networks rarely run intrusion detection because commercial systems assume dedicated security staff. BANTAY packages a signature-based detection engine with a simplified alert console tuned for a single network administrator. Replayed attack traffic covering port scans, brute-force logins, and ARP spoofing was detected at a 94% true-positive rate.',keywords:['network security','intrusion detection','campus network'],pages:118,views:198},
{code:'CAP-0400-0027-2021',title:'HABI: A 2D Animated Short Film on Higaonon Weaving Traditions',authors:['Sofia Isabel Gaerlan','Timothy John Alaba'],program:PR[3],sy:'2020–2021',sem:'2nd Semester',area:A[7],adviser:'Prof. Anton Velez',abstract:'Higaonon weaving traditions in Northern Mindanao are documented mostly in academic text inaccessible to young audiences. HABI is a seven-minute 2D animated short developed with input from weaver elders in Impasug-ong, Bukidnon. Screening surveys with 120 senior high school students showed significant gains in recognition of Higaonon textile motifs.',keywords:['2D animation','indigenous culture','Higaonon','cultural heritage'],pages:84,views:329},
{code:'CAP-0300-0074-2019',title:'TINDAHAN: A Business Intelligence Toolkit for Sari-Sari Store Inventory Forecasting',authors:['Ryan Christopher Ballesteros','Angelica Faye Dumo'],program:PR[2],sy:'2018–2019',sem:'2nd Semester',area:A[8],adviser:'Prof. Cecilia Mabolo',abstract:'Sari-sari store owners restock by intuition, resulting in frequent stockouts of fast-moving goods. TINDAHAN applies exponential smoothing to point-of-sale logs to forecast weekly demand per item and suggest order quantities. In an eight-week trial with five stores, stockout incidents fell by 41% against the preceding period.',keywords:['business intelligence','forecasting','inventory','micro-retail'],pages:88,views:167},
{code:'CAP-0200-0102-2019',title:'SAKAY: A Real-Time Jeepney Route Finder for Cagayan de Oro Commuters',authors:['Kim Andrei Bacarro','Louise Fernandez','Jethro Paalam','Diana Rose Ubay-ubay'],program:PR[1],sy:'2018–2019',sem:'1st Semester',area:A[4],adviser:'Engr. Paolo Gaccion',abstract:'Commuters in Cagayan de Oro rely on word of mouth to navigate the city\u2019s jeepney routes. SAKAY maps all 62 registered routes and computes multi-ride paths between any two points, with fare estimates. Usability testing with 30 commuters gave a task success rate of 93% for first-time route finding.',keywords:['route finding','public transport','web application','commuting'],pages:94,views:356},
{code:'THE-0100-0018-2018',title:'PULSO: Time-Series Forecasting of Dengue Case Trends in Cagayan de Oro City',authors:['Erika Mae Cabanlit','Joseph Ian Madula'],program:PR[0],sy:'2017–2018',sem:'2nd Semester',area:A[1],adviser:'Dr. Ferdinand Pitagan',abstract:'Dengue response in Cagayan de Oro is largely reactive, mobilizing only after case counts spike. PULSO fits seasonal ARIMA models to five years of City Health Office surveillance data to forecast weekly case trends per district. Forecasts tracked actual 2017 case counts within a 12% mean absolute percentage error.',keywords:['time series','dengue','forecasting','public health'],pages:86,views:221},
{code:'CAP-0400-0033-2020',title:'KULAY: An Interactive Motion Graphics Exhibit for the Museo de Oro Heritage Collection',authors:['Bianca Louise Tagarda','Carl Justin Emata','Frances Nicole Yap'],program:PR[3],sy:'2019–2020',sem:'1st Semester',area:A[7],adviser:'Prof. Anton Velez',abstract:'Museo de Oro\u2019s heritage collection is displayed with static labels that younger visitors tend to skip. KULAY adds an interactive motion graphics exhibit with touch-driven vignettes for twelve key artifacts. Observation of 85 visitors showed average dwell time at the covered exhibits tripled compared to label-only displays.',keywords:['motion graphics','museum','interactive exhibit','heritage'],pages:80,views:143}
];

const submissions = [
{id:1,submitter:'Sandy Villarin',mine:true,title:'ORIGIN: A Knowledge Management Repository for the College of Computer Studies',authors:'Sandy Villarin, Bea Cabactulan, Ram Dael',program:PR[1],sy:'2025–2026',sem:'2nd Semester',area:A[0],adviser:'Engr. Ma. Teresa Salcedo',keywords:'knowledge management, OCR, repository',abstract:'Past thesis and capstone manuscripts of the College of Computer Studies exist only as hardbound copies locked inside room FH 101. ORIGIN digitizes and indexes them through OCR into a searchable, view-only repository that complements the physical archive. The system supports self-submission with coordinator review, citation generation, and role-based access for students, coordinators, and administrators.',date:'Jul 18, 2026',status:'Under review',remarks:'',attempt:1,history:[{ts:'Jul 18, 2026',label:'Submitted · attempt 1',by:'Sandy Villarin'}]},
{id:2,submitter:'Carlo Emata',mine:false,title:'HARVEST: A Crop Price Monitoring Dashboard for Bukidnon Farmers Cooperatives',authors:'Carlo Emata, Nina Roa',program:PR[2],sy:'2025–2026',sem:'2nd Semester',area:A[8],adviser:'Dr. Rowena Dagondon',keywords:'crop prices, dashboard, cooperatives',abstract:'Farmers cooperatives in Bukidnon track crop prices through phone calls and word of mouth, often selling below prevailing market rates. HARVEST aggregates daily price reports from partner trading posts into a dashboard with per-crop trends and alerts. A pilot with two cooperatives showed members referenced the dashboard before 70% of their selling decisions.',date:'Jul 16, 2026',status:'Under review',remarks:'',attempt:1,history:[{ts:'Jul 16, 2026',label:'Submitted · attempt 1',by:'Carlo Emata'}]},
{id:3,submitter:'Sandy Villarin',mine:true,title:'BAYANIHAN: A Volunteer Coordination Platform for Campus Outreach Programs',authors:'Sandy Villarin, Bea Cabactulan',program:PR[1],sy:'2024–2025',sem:'2nd Semester',area:A[4],adviser:'Engr. Ma. Teresa Salcedo',keywords:'volunteers, scheduling, outreach',abstract:'Campus outreach programs coordinate volunteers through group chats, causing missed shifts and uneven staffing. BAYANIHAN provides sign-up sheets, shift reminders, and attendance tracking for program leads. Trial use in two outreach events reduced unfilled shifts from nine to two.',date:'Jun 30, 2026',status:'Returned',remarks:'Abstract exceeds 300 words and the keywords duplicate the title. Trim the abstract and resubmit — the manuscript scan itself is fine.',attempt:1,history:[{ts:'Jun 28, 2026',label:'Submitted · attempt 1',by:'Sandy Villarin'},{ts:'Jun 30, 2026',label:'Returned for revision',by:'Prof. Liezel Bartolome (Coordinator)',remarks:'Abstract exceeds 300 words and the keywords duplicate the title. Trim the abstract and resubmit — the manuscript scan itself is fine.'}]},
{id:4,submitter:'Denise Lagura',mine:false,title:'KAAGAPAY: An Appointment Scheduler for the University Guidance Center',authors:'Denise Lagura, Mika Sabellano',program:PR[0],sy:'2025–2026',sem:'1st Semester',area:A[1],adviser:'Dr. Ferdinand Pitagan',keywords:'scheduling, guidance, appointments',abstract:'The University Guidance Center books counseling sessions through a paper logbook, producing double-bookings and long walk-in waits. KAAGAPAY implements an online appointment scheduler with counselor availability, reminders, and no-show tracking. During a one-semester pilot, double-bookings were eliminated and average scheduling time dropped to under two minutes.',date:'Jun 24, 2026',status:'Approved',remarks:'',attempt:1,history:[{ts:'Jun 20, 2026',label:'Submitted · attempt 1',by:'Denise Lagura'},{ts:'Jun 24, 2026',label:'Approved and published',by:'Prof. Liezel Bartolome (Coordinator)'}]}
];

const users = [
{name:'Sandy Villarin',email:'svillarin@my.xu.edu.ph',role:'Student',status:'Active',last:'Jul 24, 2026 09:12'},
{name:'Carlo Emata',email:'cemata@my.xu.edu.ph',role:'Student',status:'Active',last:'Jul 23, 2026 16:40'},
{name:'Denise Lagura',email:'dlagura@my.xu.edu.ph',role:'Student',status:'Active',last:'Jul 22, 2026 11:03'},
{name:'Prof. Liezel Bartolome',email:'lbartolome@xu.edu.ph',role:'Research Coordinator',status:'Active',last:'Jul 24, 2026 08:31'},
{name:'Ramil Ocampo',email:'rocampo@xu.edu.ph',role:'System Administrator',status:'Active',last:'Jul 24, 2026 07:55'},
{name:'Janrey Balane',email:'jbalane@my.xu.edu.ph',role:'Student',status:'Suspended',last:'May 02, 2026 14:20'}
];

/** `d` = days ago, used by the audit range filter in the prototype. */
const audit = [
{ts:'Jul 24 09:12',user:'svillarin',role:'Student',action:'VIEW_PAPER',code:'CAP-0200-0147-2021',ip:'10.14.2.87',d:1},
{ts:'Jul 24 09:10',user:'svillarin',role:'Student',action:'SEARCH',code:'—',ip:'10.14.2.87',d:1},
{ts:'Jul 24 08:31',user:'lbartolome',role:'Coordinator',action:'APPROVE_SUBMISSION',code:'CAP-0100-0152-2026',ip:'10.14.1.12',d:1},
{ts:'Jul 24 08:02',user:'system',role:'System',action:'BACKUP_RUN',code:'—',ip:'127.0.0.1',d:1},
{ts:'Jul 23 16:40',user:'cemata',role:'Student',action:'SUBMIT_PAPER',code:'—',ip:'10.14.3.55',d:1},
{ts:'Jul 23 15:22',user:'cemata',role:'Student',action:'CITE_EXPORT',code:'THE-0100-0032-2019',ip:'10.14.3.55',d:1},
{ts:'Jul 23 14:07',user:'dlagura',role:'Student',action:'VIEW_PAPER',code:'CAP-0200-0139-2021',ip:'10.14.5.20',d:1},
{ts:'Jul 22 11:03',user:'dlagura',role:'Student',action:'BOOKMARK_ADD',code:'THE-0100-0045-2021',ip:'10.14.5.20',d:2},
{ts:'Jul 22 10:48',user:'dlagura',role:'Student',action:'VIEW_PAPER',code:'THE-0100-0045-2021',ip:'10.14.5.20',d:2},
{ts:'Jul 21 09:35',user:'lbartolome',role:'Coordinator',action:'UPLOAD_MANUSCRIPT',code:'CAP-0400-0033-2020',ip:'10.14.1.12',d:3},
{ts:'Jul 20 13:16',user:'svillarin',role:'Student',action:'CITE_EXPORT',code:'CAP-0200-0147-2021',ip:'10.14.2.87',d:4},
{ts:'Jul 18 17:41',user:'rocampo',role:'Admin',action:'ROLE_CHANGE',code:'—',ip:'10.14.0.4',d:6},
{ts:'Jul 17 08:00',user:'system',role:'System',action:'BACKUP_RUN',code:'—',ip:'127.0.0.1',d:7},
{ts:'Jul 12 10:22',user:'cemata',role:'Student',action:'VIEW_PAPER',code:'CAP-0300-0074-2019',ip:'10.14.3.55',d:12},
{ts:'Jul 05 15:09',user:'dlagura',role:'Student',action:'LOGIN',code:'—',ip:'10.14.5.20',d:19},
{ts:'Jun 28 11:47',user:'svillarin',role:'Student',action:'VIEW_PAPER',code:'CAP-0400-0027-2021',ip:'10.14.2.87',d:26},
{ts:'Jul 23 10:15',user:'cemata',role:'Student',action:'VIEW_PAPER',code:'THE-0100-0032-2019',ip:'10.14.3.55',d:1},
{ts:'Jul 22 09:50',user:'svillarin',role:'Student',action:'VIEW_PAPER',code:'CAP-0200-0147-2021',ip:'10.14.2.87',d:2},
{ts:'Jul 21 15:33',user:'jbalane',role:'Student',action:'VIEW_PAPER',code:'CAP-0200-0147-2021',ip:'10.14.7.19',d:3},
{ts:'Jul 19 13:02',user:'dlagura',role:'Student',action:'VIEW_PAPER',code:'THE-0100-0032-2019',ip:'10.14.5.20',d:5},
{ts:'Jul 15 16:24',user:'cemata',role:'Student',action:'VIEW_PAPER',code:'CAP-0200-0139-2021',ip:'10.14.3.55',d:9}
];

const ocrJobs = [
{file:'CAP-0200-0147-2021.pdf',pages:'96',status:'Complete',dur:'4m 12s',when:'Jul 22, 14:03'},
{file:'THE-0100-0051-2021.pdf',pages:'118',status:'Complete',dur:'5m 40s',when:'Jul 21, 09:44'},
{file:'CAP-0400-0033-2020.pdf',pages:'80',status:'Complete',dur:'3m 28s',when:'Jul 21, 09:35'},
{file:'CAP-0300-0088-2020.pdf',pages:'90',status:'Failed',dur:'0m 52s',when:'Jul 20, 16:12'},
{file:'CAP-0300-0088-2020_rescan.pdf',pages:'90',status:'Complete',dur:'4m 05s',when:'Jul 20, 16:40'}
];

module.exports = { categories, papers, submissions, users, audit, ocrJobs };
