// Sanjeevani Pharmacy & Healthcare - Product & Health Catalog Data
// Certified Pharmaceutical Formulations, Salt Compositions, and Medical Specs

const PHARMACY_CATEGORIES = [
  { id: "all", name: "All Healthcare", icon: "🏥", badge: "2000+ Items" },
  { id: "prescription", name: "Prescription Rx", icon: "💊", badge: "Doctor's Rx" },
  { id: "otc", name: "Pain & OTC", icon: "🩹", badge: "Instant Relief" },
  { id: "diabetes", name: "Diabetes Care", icon: "🩸", badge: "Up to 25% Off" },
  { id: "cardiac", name: "Cardiac & BP", icon: "❤️", badge: "Chronic Care" },
  { id: "vitamins", name: "Vitamins & Immunity", icon: "✨", badge: "Daily Boost" },
  { id: "ayurveda", name: "Ayurveda & Herbal", icon: "🌿", badge: "100% Natural" },
  { id: "baby-care", name: "Mother & Baby", icon: "👶", badge: "Gentle Care" },
  { id: "devices", name: "Health Devices", icon: "🩺", badge: "Diagnostics" },
  { id: "personal-care", name: "Derma & Skin", icon: "🧴", badge: "Clinically Tested" }
];

const PROMO_COUPONS = {
  "WELCOME25": { code: "WELCOME25", discountPercent: 25, maxDiscount: 250, minOrder: 0, desc: "25% OFF for First-Time Users" },
  "SAVE100": { code: "SAVE100", discountAmount: 100, minOrder: 1000, desc: "Flat ₹100 OFF on orders above ₹1,000" },
  "FIRSTMED20": { code: "FIRSTMED20", discountPercent: 20, maxDiscount: 250, minOrder: 300, desc: "20% OFF on your first order" },
  "HEALTH15": { code: "HEALTH15", discountPercent: 15, maxDiscount: 300, minOrder: 500, desc: "15% OFF on orders above ₹500" },
  "FREESHIP": { code: "FREESHIP", freeShipping: true, minOrder: 0, desc: "Complimentary Express Delivery" },
  "CHRONIC25": { code: "CHRONIC25", discountPercent: 25, maxDiscount: 500, minOrder: 1200, desc: "25% OFF on Chronic Care Refills" },
  "HEALTH35": { code: "HEALTH35", discountPercent: 35, maxDiscount: 500, minOrder: 0, desc: "35% OFF Health Day Special Offer" },
  "NEWYEAR35": { code: "NEWYEAR35", discountPercent: 35, maxDiscount: 500, minOrder: 0, desc: "35% OFF New Year Day Sale" },
  "MAY25": { code: "MAY25", discountPercent: 25, maxDiscount: 300, minOrder: 0, desc: "25% OFF Special May 30th Offer" }
};

const PRODUCTS = [
  // --- PRESCRIPTION DRUGS ---
  {
    id: "augmentin-625-duo",
    name: "Augmentin 625 Duo Tablet",
    salt: "Amoxicillin (500mg) + Clavulanic Acid (125mg)",
    therapeuticClass: "Antibacterial / Penicillin Combination",
    category: "prescription",
    categoryName: "Prescription Medicines",
    manufacturer: "GlaxoSmithKline Pharmaceuticals Ltd",
    isRx: true,
    price: 182,
    mrp: 228,
    discount: 20,
    rating: 4.9,
    reviewCount: 1850,
    badge: "Top Antibiotic",
    packSize: "Strip of 10 Tablets",
    packOptions: [
      { name: "Strip of 10 Tablets", price: 182, mrp: 228 },
      { name: "Pack of 2 Strips (20 Tablets)", price: 345, mrp: 456 },
      { name: "Pack of 3 Strips (30 Tablets)", price: 499, mrp: 684 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "tablet-strip",
    accentColor: "#0284C7",
    description: "Augmentin 625 Duo Tablet is a gold-standard antibiotic formulation combining Amoxicillin and Clavulanic Acid. It effectively fights resistant bacterial infections of the respiratory tract, ear, nose, throat, skin, and urinary tract by neutralizing bacterial beta-lactamase enzymes.",
    benefits: [
      "Broad-spectrum efficacy against Gram-positive and Gram-negative bacteria",
      "Clavulanic acid prevents bacterial enzyme resistance",
      "Quick relief from acute respiratory and ENT bacterial infections",
      "Manufactured in WHO-GMP certified sterile facilities"
    ],
    usage: "Take strictly as advised by your physician. Swallow the tablet whole with a meal to avoid gastrointestinal discomfort. Complete the full prescribed course even if symptoms resolve earlier.",
    sideEffects: [
      "Mild nausea or stomach discomfort",
      "Mild diarrhea or loose stools",
      "Skin rash (discontinue and consult physician if allergic symptoms occur)"
    ],
    precautions: "Do not self-medicate. Inform your doctor if you have prior allergies to penicillin or amoxicillin, or any hepatic/renal impairment. Safe in pregnancy only when clearly indicated by an obstetrician.",
    storage: "Store in a cool, dry place below 25°C. Protect from moisture and direct sunlight. Keep out of reach of children.",
    genericAlternatives: [
      { brand: "Moxikind-CV 625", company: "Mankind Pharma", price: 135, mrp: 175, saving: "26% Cheaper" },
      { brand: "Clavam 625", company: "Alkem Laboratories", price: 155, mrp: 204, saving: "15% Cheaper" }
    ],
    reviews: [
      { author: "Dr. Arvind Natarajan", location: "Bengaluru", rating: 5, date: "September 2026", comment: "Consistently reliable efficacy for acute tonsillitis and sinus infections. Genuine batch delivered within 90 minutes." },
      { author: "Meera Kulkarni", location: "Mumbai", rating: 5, date: "August 2026", comment: "Authentic blister pack with unbroken foil seal. Pharmacist verified my prescription promptly." },
      { author: "Rajesh Soni", location: "Hyderabad", rating: 4.8, date: "August 2026", comment: "Great discount on regular pharmacy pricing, and customer care explained the dose timing clearly." }
    ]
  },
  {
    id: "glycomet-gp1",
    name: "Glycomet-GP 1 Tablet PR",
    salt: "Metformin (500mg) + Glimepiride (1mg)",
    therapeuticClass: "Oral Hypoglycemic / Antidiabetic",
    category: "diabetes",
    categoryName: "Diabetes Care",
    manufacturer: "USV Private Limited",
    isRx: true,
    price: 138,
    mrp: 172,
    discount: 20,
    rating: 4.8,
    reviewCount: 2420,
    badge: "Chronic Essential",
    packSize: "Strip of 15 Tablets",
    packOptions: [
      { name: "Strip of 15 Tablets", price: 138, mrp: 172 },
      { name: "Monthly Refill (45 Tablets)", price: 385, mrp: 516 },
      { name: "Quarterly Care (90 Tablets)", price: 720, mrp: 1032 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "tablet-strip",
    accentColor: "#059669",
    description: "Glycomet-GP 1 Tablet PR is an extended-release dual combination medicine that helps manage high blood glucose levels in adults with Type 2 Diabetes Mellitus. Metformin improves insulin sensitivity, while Glimepiride stimulates pancreatic insulin secretion.",
    benefits: [
      "Dual-action formula maintains stable 24-hour glycemic control",
      "Prolonged-release (PR) mechanism reduces risk of sudden hypoglycemic spikes",
      "Assists in lowering HbA1c and preventing diabetic microvascular complications",
      "Gentle sustained stomach absorption"
    ],
    usage: "Take once daily with your primary morning meal or breakfast. Do not crush or chew the prolonged-release tablet. Monitor blood sugar regularly.",
    sideEffects: [
      "Hypoglycemia (low blood sugar) if meals are skipped",
      "Mild metallic taste or flatulence during initial week",
      "Headache or mild nausea"
    ],
    precautions: "Always carry quick-acting sugar or glucose candy. Avoid excessive alcohol consumption. Regular kidney function and HbA1c monitoring recommended.",
    storage: "Store at controlled room temperature (15°C - 30°C). Keep away from humidity.",
    genericAlternatives: [
      { brand: "Gemer 1 Tablet", company: "Sun Pharma", price: 120, mrp: 155, saving: "13% Cheaper" },
      { brand: "Zoryl-M 1", company: "Intas Pharmaceuticals", price: 128, mrp: 160, saving: "7% Cheaper" }
    ],
    reviews: [
      { author: "K. R. Venkataraman", location: "Chennai", rating: 5, date: "September 2026", comment: "My monthly staple for 4 years. Ordering online saves me both money and hassle. Always long expiry dates." },
      { author: "Sunita Bhatia", location: "Pune", rating: 5, date: "August 2026", comment: "Excellent blister packaging and cold storage maintained during delivery." }
    ]
  },
  {
    id: "telma-h-tablet",
    name: "Telma-H Tablet",
    salt: "Telmisartan (40mg) + Hydrochlorothiazide (12.5mg)",
    therapeuticClass: "Antihypertensive / ARB + Diuretic",
    category: "cardiac",
    categoryName: "Cardiac & Blood Pressure",
    manufacturer: "Glenmark Pharmaceuticals Ltd",
    isRx: true,
    price: 245,
    mrp: 310,
    discount: 21,
    rating: 4.9,
    reviewCount: 1680,
    badge: "Hypertension Care",
    packSize: "Strip of 15 Tablets",
    packOptions: [
      { name: "Strip of 15 Tablets", price: 245, mrp: 310 },
      { name: "Monthly Pack (30 Tablets)", price: 465, mrp: 620 },
      { name: "Refill Pack (60 Tablets)", price: 890, mrp: 1240 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "tablet-strip",
    accentColor: "#DC2626",
    description: "Telma-H Tablet is a synergistic blood pressure management medication. Telmisartan relaxes vascular smooth muscles by inhibiting Angiotensin II, while Hydrochlorothiazide eliminates excess salt and water through diuresis, reducing arterial strain and stroke risk.",
    benefits: [
      "Provides sustained 24-hour blood pressure reduction",
      "Reduces cardiovascular risk and protects renal blood vessels",
      "Well-tolerated combination with proven clinical longevity",
      "Backed by Glenmark's high-purity synthesis standard"
    ],
    usage: "Take one tablet daily at a fixed time, preferably in the morning with or without food. Stay adequately hydrated throughout the day.",
    sideEffects: [
      "Occasional mild dizziness on sudden standing",
      "Increased urination frequency during the initial 48 hours",
      "Mild fatigue"
    ],
    precautions: "Do not stop abruptly without consulting your cardiologist. Periodic electrolyte (potassium and sodium) testing advised. Contraindicated in pregnancy.",
    storage: "Store below 25°C in original moisture-proof Alu-Alu packaging.",
    genericAlternatives: [
      { brand: "Telmikind-H", company: "Mankind Pharma", price: 180, mrp: 230, saving: "26% Cheaper" },
      { brand: "Telsartan-H", company: "Dr. Reddy's Laboratories", price: 210, mrp: 265, saving: "14% Cheaper" }
    ],
    reviews: [
      { author: "Col. P. K. Verma", location: "New Delhi", rating: 5, date: "September 2026", comment: "My blood pressure has remained strictly at 120/80 with Telma-H. Fast express delivery." },
      { author: "Sharada Rao", location: "Bengaluru", rating: 4.9, date: "July 2026", comment: "Clean packaging, verified pharmacist check on WhatsApp. Very comforting." }
    ]
  },
  {
    id: "pan-d-capsule",
    name: "Pan-D Capsule PR",
    salt: "Pantoprazole (40mg) + Domperidone (30mg)",
    therapeuticClass: "Gastrointestinal / Proton Pump Inhibitor",
    category: "prescription",
    categoryName: "Prescription Medicines",
    manufacturer: "Alkem Laboratories Ltd",
    isRx: true,
    price: 175,
    mrp: 219,
    discount: 20,
    rating: 4.8,
    reviewCount: 3100,
    badge: "Acidity & GERD",
    packSize: "Strip of 15 Capsules",
    packOptions: [
      { name: "Strip of 15 Capsules", price: 175, mrp: 219 },
      { name: "Pack of 30 Capsules", price: 330, mrp: 438 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "capsule-strip",
    accentColor: "#EA580C",
    description: "Pan-D Capsule PR provides rapid and lasting relief from severe acid reflux, gastroesophageal reflux disease (GERD), heartburn, and peptic ulcers. Pantoprazole curtails excess gastric acid generation, while Domperidone stimulates stomach motility to avert backflow.",
    benefits: [
      "Rapidly alleviates acid burning sensation in chest and throat",
      "Prevents morning nausea and esophageal acid irritation",
      "Sustained 24-hour gastric pH optimization",
      "Dual enteric-coated pellets protect active compounds"
    ],
    usage: "Swallow one capsule whole on an empty stomach at least 30 to 60 minutes before breakfast with a glass of water.",
    sideEffects: [
      "Dry mouth",
      "Mild headache",
      "Occasional transient abdominal cramps"
    ],
    precautions: "Do not chew or crush the capsule pellets. Prolonged unsupervised use beyond doctor's prescription is not recommended.",
    storage: "Store below 25°C in a dry environment protected from light.",
    genericAlternatives: [
      { brand: "Pantocid-D SR", company: "Sun Pharma", price: 180, mrp: 225, saving: "Equivalent" },
      { brand: "Pansec-D SR", company: "Cipla", price: 165, mrp: 210, saving: "6% Cheaper" }
    ],
    reviews: [
      { author: "Deepak Joshi", location: "Ahmedabad", rating: 5, date: "August 2026", comment: "Takes away acute heartburn in under 45 minutes. Authentic Alkem batch." }
    ]
  },
  {
    id: "allegra-120mg",
    name: "Allegra 120mg Tablet",
    salt: "Fexofenadine Hydrochloride (120mg)",
    therapeuticClass: "Second Generation Antihistamine",
    category: "otc",
    categoryName: "Pain & OTC",
    manufacturer: "Sanofi India Ltd",
    isRx: false,
    price: 198,
    mrp: 236,
    discount: 16,
    rating: 4.9,
    reviewCount: 1450,
    badge: "Non-Drowsy Allergy",
    packSize: "Strip of 10 Tablets",
    packOptions: [
      { name: "Strip of 10 Tablets", price: 198, mrp: 236 },
      { name: "Pack of 20 Tablets", price: 375, mrp: 472 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "tablet-strip",
    accentColor: "#8B5CF6",
    description: "Allegra 120mg is a premier non-drowsy antihistamine that delivers all-day relief from seasonal allergic rhinitis, hay fever, sneezing, runny nose, itchy throat, watery eyes, and allergic skin hives without causing sluggishness or daytime fatigue.",
    benefits: [
      "Fast 60-minute onset with 24-hour uninterrupted allergy shield",
      "Non-drowsy formulation — safe for working professionals and drivers",
      "Does not cross the blood-brain barrier significantly",
      "Clinically trusted worldwide by allergists and ENT specialists"
    ],
    usage: "Take one tablet once daily with water. Avoid consuming grapefruit or orange juice within 2 hours as fruit juices may decrease drug absorption.",
    sideEffects: [
      "Mild headache",
      "Drowsiness (rare, under 1%)",
      "Dry mouth"
    ],
    precautions: "Do not exceed one tablet per 24 hours unless directed by your physician. Consult doctor if pregnant or nursing.",
    storage: "Store below 25°C away from humidity.",
    genericAlternatives: [
      { brand: "Fexova 120", company: "Ipca Laboratories", price: 135, mrp: 170, saving: "32% Cheaper" },
      { brand: "Histafree 120", company: "Mankind Pharma", price: 125, mrp: 160, saving: "37% Cheaper" }
    ],
    reviews: [
      { author: "Sneha Nair", location: "Kochi", rating: 5, date: "September 2026", comment: "Lifesaver during pollen season! Zero drowsiness so I can work all day without foggy feeling." }
    ]
  },

  // --- OTC & PAIN RELIEF ---
  {
    id: "dolo-650",
    name: "Dolo 650 Tablet",
    salt: "Paracetamol / Acetaminophen (650mg)",
    therapeuticClass: "Antipyretic & Analgesic",
    category: "otc",
    categoryName: "Pain & OTC",
    manufacturer: "Micro Labs Ltd",
    isRx: false,
    price: 31,
    mrp: 34,
    discount: 9,
    rating: 4.9,
    reviewCount: 9500,
    badge: "India's #1 Fever Pill",
    packSize: "Strip of 15 Tablets",
    packOptions: [
      { name: "Strip of 15 Tablets", price: 31, mrp: 34 },
      { name: "Family Pack (45 Tablets)", price: 88, mrp: 102 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "tablet-strip",
    accentColor: "#059669",
    description: "Dolo 650 is India's most trusted household paracetamol formulation for managing high fever, body aches, headaches, joint pain, toothaches, and mild muscular spasms. Gentle on the stomach lining when taken as recommended.",
    benefits: [
      "Rapidly reduces elevated body temperature within 30 minutes",
      "Safe and non-acidic analgesic formulation",
      "Trusted by over 100,000 physicians across India",
      "Affordable and high safety profile across age groups"
    ],
    usage: "Take one tablet every 4 to 6 hours as needed for fever or pain. Do not exceed 4 tablets (2600mg) in 24 hours. Take with food or water.",
    sideEffects: [
      "Extremely rare when taken within recommended dosage limits",
      "Liver toxicity risk ONLY if severely overdosed"
    ],
    precautions: "Do not combine with other paracetamol-containing cold and flu medicines. Limit alcohol consumption.",
    storage: "Store below 30°C in a dry place.",
    genericAlternatives: [
      { brand: "Calpol 650", company: "GlaxoSmithKline", price: 32, mrp: 35, saving: "Identical" },
      { brand: "Pacimol 650", company: "Ipca Laboratories", price: 29, mrp: 33, saving: "6% Cheaper" }
    ],
    reviews: [
      { author: "Amit Trivedi", location: "Lucknow", rating: 5, date: "September 2026", comment: "Standard essential medicine in every home first aid kit. Instant fever relief." }
    ]
  },
  {
    id: "volini-pain-spray-100g",
    name: "Volini Maxx Pain Relief Spray (100g)",
    salt: "Diclofenac Diethylamine + Virgin Linseed Oil + Methyl Salicylate + Menthol",
    therapeuticClass: "Topical Non-Steroidal Anti-inflammatory (NSAID)",
    category: "otc",
    categoryName: "Pain & OTC",
    manufacturer: "Sun Pharmaceutical Industries Ltd",
    isRx: false,
    price: 249,
    mrp: 320,
    discount: 22,
    rating: 4.8,
    reviewCount: 3890,
    badge: "Instant 360° Spray",
    packSize: "Can of 100g",
    packOptions: [
      { name: "Can of 100g", price: 249, mrp: 320 },
      { name: "Twin Value Pack (2 x 100g)", price: 460, mrp: 640 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "spray-can",
    accentColor: "#F97316",
    description: "Volini Maxx Pain Relief Spray features a micro-droplet 360-degree aerosol nozzle that penetrates deep into muscular tissue to alleviate acute backaches, joint stiffness, neck cramps, sports sprains, and arthritis pain with an instant cooling sensation.",
    benefits: [
      "Fast absorbing 2% Diclofenac deep penetrative formula",
      "360-degree spray angle reaches tough areas like lower back and shoulders",
      "Linseed oil soothes local inflammation naturally",
      "Menthol delivers instant icy soothing sensation"
    ],
    usage: "Shake well before use. Spray from a distance of 5-8 cm onto the affected area 3 to 4 times daily. Do not massage vigorously after spraying.",
    sideEffects: [
      "Mild redness or transient burning sensation at application site"
    ],
    precautions: "For external use only. Do not spray on open wounds, broken skin, or near eyes. Flammable aerosol.",
    storage: "Store below 25°C. Do not puncture or incinerate the pressurized container.",
    genericAlternatives: [
      { brand: "Moov Instant Pain Relief Spray", company: "Reckitt Benckiser", price: 235, mrp: 295, saving: "5% Cheaper" },
      { brand: "Relispray", company: "Midas Care", price: 215, mrp: 275, saving: "14% Cheaper" }
    ],
    reviews: [
      { author: "Karan Johar", location: "Chandigarh", rating: 5, date: "September 2026", comment: "Brilliant for gym cramps and shoulder stiffness. Immediate relief." }
    ]
  },
  {
    id: "otrivin-oxy-spray",
    name: "Otrivin Oxy Fast Relief Nasal Spray (10ml)",
    salt: "Oxymetazoline Hydrochloride (0.05% w/v)",
    therapeuticClass: "Topical Nasal Decongestant",
    category: "otc",
    categoryName: "Pain & OTC",
    manufacturer: "GlaxoSmithKline Consumer Healthcare",
    isRx: false,
    price: 110,
    mrp: 125,
    discount: 12,
    rating: 4.8,
    reviewCount: 2200,
    badge: "25-Sec Action",
    packSize: "Bottle of 10ml",
    packOptions: [
      { name: "Bottle of 10ml", price: 110, mrp: 125 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "dropper-bottle",
    accentColor: "#0284C7",
    description: "Otrivin Oxy Nasal Spray begins clearing blocked nasal passages in just 25 seconds and keeps airways clear for up to 12 hours. Ideal for unblocking stuffy noses due to colds, sinusitis, and dust allergies so you can breathe and sleep comfortably.",
    benefits: [
      "Ultra-fast action starts opening nasal airways in 25 seconds",
      "Long-lasting relief up to 12 hours with a single metered dose",
      "Reduces sinus mucosal swelling and congestion",
      "Fine mist spray covers the entire nasal lining evenly"
    ],
    usage: "Administer 1-2 sprays into each nostril 2 to 3 times daily. Do not use for more than 7 consecutive days without consulting a doctor.",
    sideEffects: [
      "Mild transient stinging or dryness in the nasal passage"
    ],
    precautions: "Prolonged use beyond 7 days can cause rebound congestion (rhinitis medicamentosa). Individual use only to avoid spreading infection.",
    storage: "Store below 30°C. Protect from direct heat.",
    genericAlternatives: [
      { brand: "Nasivion Classic 0.05%", company: "Procter & Gamble Health", price: 105, mrp: 120, saving: "5% Cheaper" }
    ],
    reviews: [
      { author: "Vikas Aggarwal", location: "Delhi", rating: 5, date: "August 2026", comment: "Unblocks the nose within seconds. A must-have during sinus flares." }
    ]
  },

  // --- VITAMINS & WELLNESS ---
  {
    id: "becosules-z-capsule",
    name: "Becosules Z Capsule",
    salt: "B-Complex + Vitamin C (Ascorbic Acid) + Zinc Sulphate",
    therapeuticClass: "Therapeutic Nutritional Supplement",
    category: "vitamins",
    categoryName: "Vitamins & Supplements",
    manufacturer: "Pfizer Limited",
    isRx: false,
    price: 49,
    mrp: 58,
    discount: 15,
    rating: 4.9,
    reviewCount: 5400,
    badge: "Bestseller Multivitamin",
    packSize: "Strip of 20 Capsules",
    packOptions: [
      { name: "Strip of 20 Capsules", price: 49, mrp: 58 },
      { name: "Family Pack (60 Capsules)", price: 135, mrp: 174 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "capsule-strip",
    accentColor: "#F59E0B",
    description: "Becosules Z is India's classic therapeutic multivitamin formulation. Fortified with essential B-complex vitamins (B1, B2, B3, B6, B9, B12), Vitamin C, and Zinc, it boosts cellular energy, expedites canker sore healing, and fortifies immune defenses.",
    benefits: [
      "Accelerates healing of painful mouth ulcers and stomatitis",
      "Replenishes depleted micronutrients after illness or antibiotic courses",
      "Zinc enhances natural immune resistance against seasonal viruses",
      "Combats chronic fatigue, lethargy, and mental exhaustion"
    ],
    usage: "Take one capsule daily with or after meals, preferably in the morning with water.",
    sideEffects: [
      "Bright yellowish discoloration of urine (completely harmless, due to Vitamin B2 riboflavin excretion)"
    ],
    precautions: "Do not exceed the recommended daily allowance. Safe during pregnancy when advised by a physician.",
    storage: "Store below 25°C in a dry place. Protect from moisture and direct light.",
    genericAlternatives: [
      { brand: "Cobadex CZS", company: "GlaxoSmithKline", price: 54, mrp: 64, saving: "Equivalent" }
    ],
    reviews: [
      { author: "Nikhil Joshi", location: "Indore", rating: 5, date: "September 2026", comment: "My mouth ulcers disappeared in 2 days. Always keep a strip at home." }
    ]
  },
  {
    id: "shelcal-500",
    name: "Shelcal 500 Tablet",
    salt: "Elemental Calcium (500mg from Oyster Shell) + Vitamin D3 (250 IU)",
    therapeuticClass: "Mineral & Bone Nutrient",
    category: "vitamins",
    categoryName: "Vitamins & Supplements",
    manufacturer: "Torrent Pharmaceuticals Ltd",
    isRx: false,
    price: 132,
    mrp: 165,
    discount: 20,
    rating: 4.9,
    reviewCount: 4200,
    badge: "Bone & Joint Care",
    packSize: "Strip of 15 Tablets",
    packOptions: [
      { name: "Strip of 15 Tablets", price: 132, mrp: 165 },
      { name: "Monthly Care (30 Tablets)", price: 250, mrp: 330 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "tablet-strip",
    accentColor: "#0D9488",
    description: "Shelcal 500 contains pure calcium derived from natural oyster shell, fortified with Vitamin D3 to ensure maximum intestinal absorption. Crucial for maintaining high bone mineral density, preventing osteoporosis, and supporting healthy teeth in adults and seniors.",
    benefits: [
      "Derived from natural oyster shell for superior elemental bioavailability",
      "Vitamin D3 facilitates optimal calcium deposition in bone matrix",
      "Helps prevent age-related osteopenia, fractures, and joint degeneration",
      "Essential support during pregnancy, lactation, and post-menopause"
    ],
    usage: "Take one tablet daily after meals with water, preferably at dinner or bedtime.",
    sideEffects: [
      "Occasional constipation or mild gas in rare cases"
    ],
    precautions: "Maintain adequate water intake throughout the day. Check with doctor if you have kidney stones or hypercalcemia.",
    storage: "Store below 25°C in a cool and dry location.",
    genericAlternatives: [
      { brand: "Cipcal 500", company: "Cipla", price: 125, mrp: 155, saving: "5% Cheaper" }
    ],
    reviews: [
      { author: "Radha Deshmukh", location: "Nagpur", rating: 5, date: "August 2026", comment: "Prescribed by my orthopedic doctor for knee joint pain. High quality original medicine." }
    ]
  },
  {
    id: "neurobion-forte",
    name: "Neurobion Forte Tablet",
    salt: "Vitamin B1 + B2 + B3 + B5 + B6 + Vitamin B12 (Cyanocobalamin)",
    therapeuticClass: "Neurotropic Micronutrient",
    category: "vitamins",
    categoryName: "Vitamins & Supplements",
    manufacturer: "Procter & Gamble Health Ltd",
    isRx: false,
    price: 44,
    mrp: 52,
    discount: 15,
    rating: 4.8,
    reviewCount: 6800,
    badge: "Nerve Health",
    packSize: "Strip of 30 Tablets",
    packOptions: [
      { name: "Strip of 30 Tablets", price: 44, mrp: 52 },
      { name: "Pack of 2 Strips (60 Tablets)", price: 82, mrp: 104 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "tablet-strip",
    accentColor: "#E11D48",
    description: "Neurobion Forte is specialized nerve care nourishment. Formulated with high-potency neurotropic B-vitamins, it repairs damaged nerve myelin sheaths, alleviating symptoms of peripheral neuropathy such as tingling, numbness, pins-and-needles, and burning sensations in feet and hands.",
    benefits: [
      "Rebuilds and protects the peripheral nervous system",
      "Relieves pins-and-needles sensation, numbness, and tingling",
      "Supports red blood cell production and DNA synthesis with Vitamin B12",
      "Economical daily nerve tonic for diabetics and elderly adults"
    ],
    usage: "Take one tablet once daily after food or as directed by your physician.",
    sideEffects: [
      "Generally very well tolerated. Mild transient flushing may occur."
    ],
    precautions: "Do not exceed the daily dose. Beneficial for long-term neuropathic management.",
    storage: "Store protected from moisture below 25°C.",
    genericAlternatives: [
      { brand: "Nurokind-OD", company: "Mankind Pharma", price: 58, mrp: 72, saving: "Alternative" }
    ],
    reviews: [
      { author: "Hasmukh Patel", location: "Surat", rating: 5, date: "September 2026", comment: "Substantially decreased diabetic tingling in my soles within 3 weeks." }
    ]
  },

  // --- HEALTHCARE DEVICES & DIAGNOSTICS ---
  {
    id: "accu-chek-active-kit",
    name: "Accu-Chek Active Blood Glucose Monitor Kit",
    salt: "Electrochemical Biosensor Glucometer Device",
    therapeuticClass: "Self-Monitoring Blood Glucose (SMBG) System",
    category: "devices",
    categoryName: "Health Devices",
    manufacturer: "Roche Diabetes Care India",
    isRx: false,
    price: 1349,
    mrp: 1799,
    discount: 25,
    rating: 4.9,
    reviewCount: 3120,
    badge: "Gold Standard Glucometer",
    packSize: "Box includes Meter + 10 Test Strips + Lancing Device + 10 Lancets",
    packOptions: [
      { name: "Starter Kit (Meter + 10 Strips)", price: 1349, mrp: 1799 },
      { name: "Kit + 50 Extra Test Strips Combo", price: 2199, mrp: 2899 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "device-box",
    accentColor: "#0284C7",
    description: "Accu-Chek Active by Roche is one of the most reliable blood glucose monitoring systems in the world. Requires a tiny 1-2 microlitre blood sample and delivers lab-accurate blood sugar readings in just 5 seconds. Features 500-result memory and pre/post meal markers.",
    benefits: [
      "Accurate results compliant with ISO 15197:2013 standards",
      "Quick 5-second measurement time with visual under-dose warning",
      "Simple two-button navigation suitable for elderly patients",
      "Includes Softclix lancing device for virtually painless finger pricks",
      "Free lifetime warranty from Roche India"
    ],
    usage: "Insert test strip into the meter. Use the Softclix lancing pen to obtain a micro-drop of blood from fingertip. Touch the edge of the strip to the drop. Read result in 5 seconds.",
    sideEffects: [
      "Minor fingertip tenderness at puncture site"
    ],
    precautions: "Do not use expired strips. Store strips in their original tightly closed vial to prevent moisture degradation.",
    storage: "Store meter and test strips at 2°C to 30°C in dry conditions.",
    genericAlternatives: [
      { brand: "OneTouch Select Plus Simple", company: "LifeScan", price: 1199, mrp: 1549, saving: "11% Cheaper" },
      { brand: "Dr. Morepen BG-03 Glucometer", company: "Morepen Labs", price: 799, mrp: 1199, saving: "40% Cheaper" }
    ],
    reviews: [
      { author: "Dr. S. K. Narang", location: "Jaipur", rating: 5, date: "September 2026", comment: "Matches laboratory venous glucose measurements within 3-4% margin. Flawless Roche quality." }
    ]
  },
  {
    id: "omron-hem-7120-bp",
    name: "Omron HEM-7120 Fully Automatic Digital Blood Pressure Monitor",
    salt: "Oscillometric Upper Arm Digital Manometer",
    therapeuticClass: "Cardiovascular Diagnostic Equipment",
    category: "devices",
    categoryName: "Health Devices",
    manufacturer: "Omron Healthcare India Pvt Ltd",
    isRx: false,
    price: 1899,
    mrp: 2460,
    discount: 23,
    rating: 4.9,
    reviewCount: 4780,
    badge: "Cardiologist #1 Choice",
    packSize: "Box with Upper Arm Monitor, Medium Cuff (22-32 cm), 4 AA Batteries & Manual",
    packOptions: [
      { name: "Standard Unit (with Medium Cuff)", price: 1899, mrp: 2460 },
      { name: "Unit + Large Wide-Range Cuff Combo", price: 2249, mrp: 2990 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "device-box",
    accentColor: "#059669",
    description: "Omron HEM-7120 is an internationally clinically validated upper-arm digital blood pressure monitor. Powered by proprietary Intellisense Technology, it automatically personalizes cuff inflation for gentle, pain-free, and rapid blood pressure and pulse measurements.",
    benefits: [
      "Intellisense Technology prevents over-inflation and arm pinching",
      "Cuff Wrapping Guide lamp confirms correct placement around the arm",
      "Hypertension indicator highlights readings above standard 135/85 mmHg",
      "Detects irregular heartbeats (arrhythmia) during measurement",
      "Comes with 3-year official Omron warranty"
    ],
    usage: "Sit quietly for 5 minutes prior to testing. Wrap cuff around left upper arm at heart level, approximately 1-2 cm above the elbow joint. Press START button and stay still until reading completes.",
    sideEffects: [
      "None"
    ],
    precautions: "Avoid caffeine, smoking, or strenuous exercise 30 minutes before taking readings. Rest arm on flat table.",
    storage: "Store in protective pouch away from high humidity, direct sunlight, and extreme temperatures.",
    genericAlternatives: [
      { brand: "Dr. Trust USA Digital BP Monitor", company: "Nureca Ltd", price: 1499, mrp: 2100, saving: "21% Cheaper" }
    ],
    reviews: [
      { author: "Bhanu Pratap Singh", location: "Bhopal", rating: 5, date: "August 2026", comment: "Extremely easy for my elderly parents to operate with single button. Highly consistent readings." }
    ]
  },
  {
    id: "dr-morepen-pulse-oximeter",
    name: "Dr. Morepen PO-09 Fingertip Pulse Oximeter",
    salt: "Dual-Wavelength Photometric Optical Sensor",
    therapeuticClass: "Respiratory Oxygen Saturation Monitor",
    category: "devices",
    categoryName: "Health Devices",
    manufacturer: "Morepen Laboratories Ltd",
    isRx: false,
    price: 749,
    mrp: 1290,
    discount: 42,
    rating: 4.7,
    reviewCount: 1980,
    badge: "Instant SpO2 Check",
    packSize: "Device with Lanyard + 2 AAA Batteries + Manual",
    packOptions: [
      { name: "Single Unit Kit", price: 749, mrp: 1290 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "device-box",
    accentColor: "#3B82F6",
    description: "Dr. Morepen PO-09 Fingertip Pulse Oximeter provides non-invasive spot measurement of arterial oxygen saturation (SpO2) and pulse rate within 6 seconds. Features a crisp dual-color OLED display with plethysmograph waveform and low battery alert.",
    benefits: [
      "Accurate SpO2 measurement within +/- 2% accuracy range",
      "Clear multi-directional OLED display readable from all 4 viewing angles",
      "Auto shut-off after 8 seconds of finger removal preserves battery life",
      "Compact, lightweight, and travel-ready with lanyard strap"
    ],
    usage: "Insert finger (index or middle finger) all the way into the rubber cushion and press power button. Keep still until stable numbers display on screen.",
    sideEffects: [
      "None"
    ],
    precautions: "Remove nail polish or artificial nails prior to measurement as pigments interfere with optical sensor light beams.",
    storage: "Store in dry protective case.",
    genericAlternatives: [
      { brand: "Beurer PO 30 Oximeter", company: "Beurer Germany", price: 1899, mrp: 2490, saving: "Premium" }
    ],
    reviews: [
      { author: "Anjali Saxena", location: "Kolkata", rating: 4.8, date: "August 2026", comment: "Quick and responsive. Gives pulse rate and oxygen level reliably." }
    ]
  },

  // --- AYURVEDA & HERBAL ---
  {
    id: "himalaya-liv52-ds",
    name: "Himalaya Liv.52 DS Tablets",
    salt: "Caper Bush (Himsra) + Wild Chicory (Kasani) Herbal Extract",
    therapeuticClass: "Ayurvedic Hepatoprotective Formulation",
    category: "ayurveda",
    categoryName: "Ayurveda & Herbal",
    manufacturer: "The Himalaya Drug Company",
    isRx: false,
    price: 185,
    mrp: 215,
    discount: 14,
    rating: 4.9,
    reviewCount: 7800,
    badge: "Double Strength Liver Care",
    packSize: "Bottle of 60 Tablets",
    packOptions: [
      { name: "Bottle of 60 Tablets", price: 185, mrp: 215 },
      { name: "Twin Value Pack (2 x 60 Tablets)", price: 345, mrp: 430 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "herbal-bottle",
    accentColor: "#15803D",
    description: "Himalaya Liv.52 DS (Double Strength) is the world's most widely researched natural hepatoprotective remedy. Infused with potent herbs like Himsra and Kasani, it protects liver cells from hepatotoxic chemicals, improves bile excretion, and stimulates healthy metabolic appetite.",
    benefits: [
      "Restores liver function efficiency in non-alcoholic fatty liver conditions",
      "Regulates elevated serum liver enzymes (SGOT, SGPT, Bilirubin)",
      "Protects hepatic parenchyma against alcohol and toxin damage",
      "100% natural Ayurvedic formulation with 70+ clinical trials"
    ],
    usage: "Take 1-2 tablets twice daily before meals with lukewarm water, or as directed by an Ayurvedic practitioner.",
    sideEffects: [
      "No known adverse effects when taken within recommended dosage"
    ],
    precautions: "Safe for long-term supportive therapy. Suitable for both adults and adolescents.",
    storage: "Store in a cool dry place, away from direct sunlight.",
    genericAlternatives: [
      { brand: "Zandu Livotrit", company: "Zandu Healthcare", price: 170, mrp: 200, saving: "8% Cheaper" }
    ],
    reviews: [
      { author: "Girish Murthy", location: "Mysuru", rating: 5, date: "September 2026", comment: "My SGPT levels normalized significantly after 2 months of Liv.52 DS. Proven Ayurvedic science." }
    ]
  },
  {
    id: "dabur-chyawanprash-1kg",
    name: "Dabur Chyawanprash 2X Immunity (1kg)",
    salt: "Amla (Indian Gooseberry) + 40+ Rare Ayurvedic Botanicals",
    therapeuticClass: "Ayurvedic Rasayana & Immunomodulator",
    category: "ayurveda",
    categoryName: "Ayurveda & Herbal",
    manufacturer: "Dabur India Ltd",
    isRx: false,
    price: 360,
    mrp: 450,
    discount: 20,
    rating: 4.9,
    reviewCount: 8900,
    badge: "2X Natural Immunity",
    packSize: "Jar of 1000g (1kg)",
    packOptions: [
      { name: "Jar of 1000g (1kg)", price: 360, mrp: 450 },
      { name: "Family Pack (2 x 1kg Jars)", price: 680, mrp: 900 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "jar-pack",
    accentColor: "#B45309",
    description: "Dabur Chyawanprash is formulated based on ancient Charaka Samhita scriptures. Packed with Vitamin C-rich Amla, Pippali, Ashwagandha, and Shatavari, it doubles immune response against recurrent seasonal flu, throat infections, and environmental pollutants.",
    benefits: [
      "Clinically proven to provide 2X immunity against common infections",
      "Rich natural source of biological antioxidants and Vitamin C",
      "Enhances respiratory strength and lung vital capacity",
      "Improves daily physical stamina and digestive vitality across all age groups"
    ],
    usage: "Adults: 1 teaspoonful (approx. 12g) twice daily with a cup of warm milk. Children (3-12 yrs): half teaspoonful daily.",
    sideEffects: [
      "None. Completely natural herbal food supplement."
    ],
    precautions: "Diabetic patients should opt for Dabur Chyawanprakash Sugar-Free variant.",
    storage: "Store tightly sealed in a dry location at room temperature.",
    genericAlternatives: [
      { brand: "Baidyanath Chyawanprash Special", company: "Baidyanath", price: 345, mrp: 430, saving: "4% Cheaper" }
    ],
    reviews: [
      { author: "Pallavi Sen", location: "Chandigarh", rating: 5, date: "August 2026", comment: "Winter essential for our whole family. Genuine Dabur jar with security seal intact." }
    ]
  },

  // --- MOTHER & BABY CARE ---
  {
    id: "sebamed-baby-wash-200ml",
    name: "Sebamed Baby Gentle Wash (200ml)",
    salt: "Soap-Free Gentle Surfactant with pH 5.5 + Allantoin",
    therapeuticClass: "Pediatric Dermatological Hygiene",
    category: "baby-care",
    categoryName: "Mother & Baby",
    manufacturer: "Sebapharma Germany / USV Ltd",
    isRx: false,
    price: 395,
    mrp: 460,
    discount: 14,
    rating: 4.9,
    reviewCount: 2600,
    badge: "100% Soap Free pH 5.5",
    packSize: "Bottle of 200ml",
    packOptions: [
      { name: "Bottle of 200ml", price: 395, mrp: 460 },
      { name: "Economy Pump (400ml)", price: 699, mrp: 850 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "baby-bottle",
    accentColor: "#0284C7",
    description: "Sebamed Baby Gentle Wash is scientifically engineered with the precise biological pH 5.5 of healthy skin. 100% soap-free and alkali-free, it shields newborn skin from lipid barrier loss, dryness, and irritation while gently cleansing delicate hair and body.",
    benefits: [
      "Exact pH 5.5 supports natural development of baby's acid mantle barrier",
      "No tears formula — gentle on infant eyes",
      "Enriched with Allantoin to soften and protect baby skin against rashes",
      "0% parabens, sulfates, formaldehyde, phthalates, or harsh colorants"
    ],
    usage: "Pour a few drops into bath water or apply gently with hand onto wet skin. Massage lightly to create a delicate foam and rinse thoroughly.",
    sideEffects: [
      "Hypoallergenic; zero adverse reactions reported"
    ],
    precautions: "For external pediatric use only.",
    storage: "Store below 25°C.",
    genericAlternatives: [
      { brand: "Cetaphil Baby Gentle Wash & Shampoo", company: "Galderma", price: 380, mrp: 440, saving: "4% Cheaper" }
    ],
    reviews: [
      { author: "Dr. Priyanka Roy", location: "Bengaluru", rating: 5, date: "September 2026", comment: "Recommended by our pediatrician. Solved my 4-month baby's dry skin patches." }
    ]
  },
  {
    id: "pampers-premium-diapers-large",
    name: "Pampers Premium Care Diaper Pants (Large, 50 Count)",
    salt: "Ultra Soft Breathable Cotton Micro-Air Vents + Lotion with Aloe Vera",
    therapeuticClass: "Pediatric Hygiene & Care",
    category: "baby-care",
    categoryName: "Mother & Baby",
    manufacturer: "Procter & Gamble Home Products",
    isRx: false,
    price: 899,
    mrp: 1199,
    discount: 25,
    rating: 4.8,
    reviewCount: 4100,
    badge: "12-Hr Leakage Guard",
    packSize: "Bag of 50 Diaper Pants (9-14 kg)",
    packOptions: [
      { name: "Bag of 50 Diapers (Large)", price: 899, mrp: 1199 },
      { name: "Mega Box (100 Diapers)", price: 1699, mrp: 2398 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "baby-pack",
    accentColor: "#0D9488",
    description: "Pampers Premium Care Pants feature 360-degree cottony softness and absorbent micro-beads that lock wetness away for up to 12 hours. Equipped with 10 million breathable micropores and soothing aloe vera lotion to guard against painful diaper rashes.",
    benefits: [
      "Up to 12-hour dry sleep protection with 3 absorbing channels",
      "Wetness indicator turns from yellow to blue when it's time for a change",
      "Gentle elastic waistband adapts naturally to baby movements without pinching",
      "Dermatologically endorsed and hypoallergenic"
    ],
    usage: "Pull up like pants with the 'FRONT' mark facing forward. To remove, easily tear off the side seams and roll closed with disposal tape.",
    sideEffects: [
      "None when changed promptly"
    ],
    precautions: "Dispose of used diapers in waste bin. Do not flush.",
    storage: "Store in a cool dry area away from dampness.",
    genericAlternatives: [
      { brand: "Huggies Complete Comfort Wonder Pants", company: "Kimberly-Clark", price: 799, mrp: 1049, saving: "11% Cheaper" }
    ],
    reviews: [
      { author: "Swati Sengupta", location: "Kolkata", rating: 5, date: "August 2026", comment: "Super soft texture and no leakages overnight. Sanjeevani delivery was on time." }
    ]
  },

  // --- DERMATOLOGY & PERSONAL CARE ---
  {
    id: "cetaphil-gentle-cleanser-250ml",
    name: "Cetaphil Gentle Skin Cleanser (250ml)",
    salt: "Hydrating Glycerin + Niacinamide (Vitamin B3) + Panthenol (Pro-Vitamin B5)",
    therapeuticClass: "Dermatological Facial & Body Cleanser",
    category: "personal-care",
    categoryName: "Derma & Skin Care",
    manufacturer: "Galderma India Pvt Ltd",
    isRx: false,
    price: 520,
    mrp: 615,
    discount: 15,
    rating: 4.9,
    reviewCount: 7100,
    badge: "Dermatologist Recommended",
    packSize: "Bottle of 250ml with Dispenser",
    packOptions: [
      { name: "Bottle of 250ml", price: 520, mrp: 615 },
      { name: "Economy Size (500ml)", price: 890, mrp: 1099 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "pump-bottle",
    accentColor: "#0284C7",
    description: "Cetaphil Gentle Skin Cleanser is a world-renowned creamy formula clinically proven to provide continuous hydration to protect against dryness. Defends against 5 signs of skin sensitivity: weakened barrier, irritation, roughness, tightness, and dryness.",
    benefits: [
      "Clinically proven to preserve natural skin moisture barrier",
      "Soap-free, fragrance-free, paraben-free, and non-comedogenic (won't clog pores)",
      "Can be used with water or wiped off gently with a soft cotton pad",
      "Safe for sensitive, eczema-prone, and rosacea-prone skin"
    ],
    usage: "Apply liberally to skin and massage gently. With water: rinse and pat dry with soft towel. Without water: wipe away excess with a cotton tissue.",
    sideEffects: [
      "Hypoallergenic formulation with virtually no irritation risk"
    ],
    precautions: "For external dermatological use only.",
    storage: "Store below 30°C.",
    genericAlternatives: [
      { brand: "Episoft Cleansing Lotion", company: "Glenmark", price: 440, mrp: 520, saving: "15% Cheaper" }
    ],
    reviews: [
      { author: "Kavita Reddy", location: "Hyderabad", rating: 5, date: "September 2026", comment: "My holy grail cleanser for sensitive skin. Completely non-drying and calming." }
    ]
  },
  {
    id: "ensure-vanilla-400g",
    name: "Ensure Complete Balanced Nutrition Powder (Vanilla, 400g)",
    salt: "32 Vital Nutrients + High Quality Protein + FOS Prebiotic Fiber + Calcium",
    therapeuticClass: "Complete Adult Nutritional Drink",
    category: "vitamins",
    categoryName: "Vitamins & Supplements",
    manufacturer: "Abbott Healthcare Pvt Ltd",
    isRx: false,
    price: 649,
    mrp: 750,
    discount: 13,
    rating: 4.8,
    reviewCount: 3850,
    badge: "Scientifically Proven Strength",
    packSize: "Tin of 400g",
    packOptions: [
      { name: "Tin of 400g", price: 649, mrp: 750 },
      { name: "Value Pack (1kg Refill)", price: 1420, mrp: 1690 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "tin-can",
    accentColor: "#0284C7",
    description: "Ensure Vanilla is a complete and balanced adult nutrition supplement scientifically formulated with 32 essential nutrients. It provides high-grade protein, calcium, Vitamin D, and prebiotics to help build muscle strength, support immunity, and maintain active energy.",
    benefits: [
      "Clinically shown to help improve bone, muscle, and digestive vitality",
      "Contains HMB and whey-casein protein mix for muscle mass preservation",
      "FOS prebiotics promote beneficial gut flora and nutrient absorption",
      "Delicious natural vanilla flavor with low sugar content"
    ],
    usage: "Add 6 level scoops (approx. 53.8g) of Ensure powder into 190ml of lukewarm water or milk. Stir continuously until dissolved and consume immediately.",
    sideEffects: [
      "None. Nutritional health food."
    ],
    precautions: "Not for parenteral (intravenous) use. Not intended for children unless prescribed.",
    storage: "Store unopened tin at room temperature. Once opened, keep lid tight and use within 3 weeks.",
    genericAlternatives: [
      { brand: "Prohance Vanilla Drink", company: "Sun Pharma", price: 580, mrp: 680, saving: "11% Cheaper" }
    ],
    reviews: [
      { author: "Ramanathan Narayanan", location: "Chennai", rating: 5, date: "August 2026", comment: "Provides my 72-year-old mother with wholesome daily strength and stamina." }
    ]
  },
  {
    id: "dettol-antiseptic-500ml",
    name: "Dettol Antiseptic Disinfectant Liquid (500ml)",
    salt: "Chloroxylenol (4.8% w/v) + Terpineol + Isopropanol",
    therapeuticClass: "First Aid Antiseptic & Germicidal Liquid",
    category: "personal-care",
    categoryName: "Derma & Skin Care",
    manufacturer: "Reckitt Benckiser India Pvt Ltd",
    isRx: false,
    price: 185,
    mrp: 215,
    discount: 14,
    rating: 4.9,
    reviewCount: 9200,
    badge: "100% Germ Protection",
    packSize: "Bottle of 500ml",
    packOptions: [
      { name: "Bottle of 500ml", price: 185, mrp: 215 },
      { name: "Value Pack (1 Litre)", price: 340, mrp: 399 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "liquid-bottle",
    accentColor: "#16A34A",
    description: "Dettol Antiseptic Liquid provides proven protection against 100 illness-causing germs. Highly versatile medical-grade antiseptic for first aid wound cleaning, minor cuts, insect bites, shaving hygiene, and germ-free personal bathing.",
    benefits: [
      "Kills 99.9% of harmful bacteria and infectious pathogens",
      "Essential first aid antiseptic for cuts, scratches, and scrapes",
      "Recommended by the Indian Medical Association (IMA)",
      "Iconic pine-amber antiseptic fragrance"
    ],
    usage: "First Aid: Dilute 1 tablespoonful (15ml) in 250ml clean water and swab wound gently. Bathing: Add 1 capful to bath water bucket.",
    sideEffects: [
      "Skin irritation if applied undiluted on delicate tissues"
    ],
    precautions: "Do not use undiluted on open wounds. For external application only. Do not swallow.",
    storage: "Store below 30°C.",
    genericAlternatives: [
      { brand: "Savlon Antiseptic Liquid", company: "ITC Limited", price: 175, mrp: 205, saving: "5% Cheaper" }
    ],
    reviews: [
      { author: "Mahesh Chawla", location: "Amritsar", rating: 5, date: "September 2026", comment: "Classic household staple. The tamper-evident seal was 100% intact." }
    ]
  },
  {
    id: "hansaplast-bandages-30",
    name: "Hansaplast Waterproof First Aid Bandages (Pack of 30)",
    salt: "Breathable Polyurethane Film + Antiseptic Silver Wound Pad",
    therapeuticClass: "First Aid Wound Dressing",
    category: "otc",
    categoryName: "Pain & OTC",
    manufacturer: "Beiersdorf India Pvt Ltd",
    isRx: false,
    price: 90,
    mrp: 110,
    discount: 18,
    rating: 4.8,
    reviewCount: 3400,
    badge: "100% Waterproof",
    packSize: "Box of 30 Sterile Strips",
    packOptions: [
      { name: "Box of 30 Strips", price: 90, mrp: 110 },
      { name: "Family Pack (100 Strips)", price: 260, mrp: 330 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "bandage-box",
    accentColor: "#E11D48",
    description: "Hansaplast Waterproof Bandages seal securely around minor cuts and blisters to block out water, dirt, and bacteria. The absorbent wound pad is non-stick for painless removal and maintains sterile conditions for rapid natural skin healing.",
    benefits: [
      "100% waterproof seal keeps wounds dry during handwashing, showers, and cooking",
      "Breathable membrane facilitates rapid tissue regeneration",
      "Strong medical adhesive stays in place for up to 24 hours",
      "Non-stick pad prevents reopening wound upon removal"
    ],
    usage: "Clean wound with antiseptic water and pat completely dry. Peel off protective strip wrappers and apply bandage smoothly without stretching.",
    sideEffects: [
      "None"
    ],
    precautions: "Change dressing daily or whenever damp.",
    storage: "Store in cool dry conditions.",
    genericAlternatives: [
      { brand: "Band-Aid Brand Waterproof Strips", company: "Johnson & Johnson", price: 95, mrp: 115, saving: "Comparable" }
    ],
    reviews: [
      { author: "Nandita Sen", location: "Bengaluru", rating: 5, date: "August 2026", comment: "Stays stuck even while washing utensils. Perfect first aid plaster." }
    ]
  },
  {
    id: "vicks-vaporub-50ml",
    name: "Vicks VapoRub Balm (50ml)",
    salt: "Menthol (2.82% w/w) + Camphor (5.26% w/w) + Eucalyptus Oil (1.33% w/w)",
    therapeuticClass: "Topical Vapour Analgesic",
    category: "otc",
    categoryName: "Pain & OTC",
    manufacturer: "Procter & Gamble Hygiene and Health Care",
    isRx: false,
    price: 155,
    mrp: 175,
    discount: 11,
    rating: 4.9,
    reviewCount: 11200,
    badge: "Instant Cold Relief",
    packSize: "Jar of 50ml",
    packOptions: [
      { name: "Jar of 50ml", price: 155, mrp: 175 },
      { name: "Family Pack (110ml)", price: 285, mrp: 325 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "balm-jar",
    accentColor: "#0284C7",
    description: "Vicks VapoRub provides quick 5-minute relief from blocked nose, coughing, headache, and body aches caused by the common cold. Releasing therapeutic aromatic vapors of menthol, camphor, and eucalyptus oil that ease breathing through the night.",
    benefits: [
      "Relieves 6 common cold symptoms within minutes",
      "Can be rubbed on chest, throat, and back for sustained vapor inhalation",
      "Suitable for steam inhalation in warm water",
      "Helps facilitate sound, undisturbed sleep during flu episodes"
    ],
    usage: "Topical: Gently rub on chest, neck, and back. Steam Inhalation: Dissolve 1-2 teaspoonfuls in a bowl of steaming hot (not boiling) water and gently inhale vapors with a towel over head.",
    sideEffects: [
      "Mild skin warming or redness"
    ],
    precautions: "Do not apply directly inside nostrils or on broken skin. Keep away from small children under 2 years.",
    storage: "Keep lid securely fastened below 25°C.",
    genericAlternatives: [
      { brand: "Amrutanjan Relief Cough & Cold Balm", company: "Amrutanjan", price: 140, mrp: 160, saving: "10% Cheaper" }
    ],
    reviews: [
      { author: "Tarun Bajaj", location: "Chandigarh", rating: 5, date: "September 2026", comment: "Nothing beats Vicks for nighttime chest congestion. Essential in winter." }
    ]
  },
  {
    id: "cofsils-lozenges-jar",
    name: "Cofsils Medicated Herbal Cough Lozenges (Ginger Lemon, Jar of 100)",
    salt: "Amylmetacresol (0.6mg) + Dichlorobenzyl Alcohol (1.2mg)",
    therapeuticClass: "Antiseptic Throat Lozenges",
    category: "otc",
    categoryName: "Pain & OTC",
    manufacturer: "Cipla Health Limited",
    isRx: false,
    price: 290,
    mrp: 350,
    discount: 17,
    rating: 4.8,
    reviewCount: 3100,
    badge: "Quick Throat Soother",
    packSize: "Jar of 100 Individually Wrapped Lozenges",
    packOptions: [
      { name: "Jar of 100 Lozenges", price: 290, mrp: 350 },
      { name: "Pocket Pack of 24 Lozenges", price: 85, mrp: 99 }
    ],
    inStock: true,
    deliveryTime: "Express Delivery in 2 Hours",
    productType: "lozenges-jar",
    accentColor: "#EAB308",
    description: "Cofsils Medicated Lozenges act in 5 minutes to soothe painful throat irritation, tickling cough, and bacterial pharyngitis. The dual antibacterial formulation neutralizes oral microbes while providing warming ginger and zesty lemon comfort.",
    benefits: [
      "Dual antibacterial action acts in under 5 minutes",
      "Relieves sore throat scratchiness, hoarseness, and painful swallowing",
      "Individually sealed lozenges convenient for pocket and office use",
      "Pleasant soothing ginger-lemon flavor"
    ],
    usage: "Slowly dissolve one lozenge in mouth every 2 to 3 hours as required. Do not chew or swallow whole.",
    sideEffects: [
      "None when used as directed"
    ],
    precautions: "Not recommended for children under 6 years due to potential choking hazard.",
    storage: "Store in a dry location below 25°C.",
    genericAlternatives: [
      { brand: "Strepsils Honey & Lemon", company: "Reckitt Benckiser", price: 310, mrp: 360, saving: "Equivalent" }
    ],
    reviews: [
      { author: "Divya Rastogi", location: "Noida", rating: 5, date: "August 2026", comment: "Stops irritating dry cough spells instantly. Great bulk jar value." }
    ]
  }
];

// Health articles and pharmacist advice snippets for education & SEO
const HEALTH_ARTICLES = [
  {
    id: "managing-type-2-diabetes",
    title: "10 Proven Tips to Regulate HbA1c Levels Naturally",
    category: "Diabetes & Metabolism",
    author: "Dr. Rohini Mehta (Chief Clinical Pharmacist, M.Pharm)",
    readTime: "4 min read",
    summary: "Discover essential lifestyle habits, glycemic index meal planning, and regular self-monitoring routines to prevent long-term diabetic complications.",
    imageColor: "#059669"
  },
  {
    id: "antibiotic-resistance-guide",
    title: "Why You Must Finish Your Full Antibiotic Course",
    category: "Prescription Safety",
    author: "Dr. S. K. Narang (MBBS, MD Pharmacology)",
    readTime: "5 min read",
    summary: "Stopping antibiotics early breeds superbugs and resistant bacterial strains. Learn why the exact prescribed dosage window is paramount for full recovery.",
    imageColor: "#0284C7"
  },
  {
    id: "hypertension-silent-killer",
    title: "Mastering Blood Pressure: Measuring Accurately at Home",
    category: "Cardiovascular Health",
    author: "Dr. Vikram Sethi (Cardiologist)",
    readTime: "3 min read",
    summary: "Avoid false high readings: learn the 5-minute rest rule, correct cuff positioning, and why morning BP logs matter to your physician.",
    imageColor: "#DC2626"
  }
];

// Interactive FAQs categorized for users
const PHARMACY_FAQS = [
  {
    category: "Prescriptions & Ordering",
    question: "Do I always need a doctor's prescription to order medicines?",
    answer: "Only products marked with the red 'Rx Required' badge require a valid doctor's prescription under the Indian Drugs and Cosmetics Act. Over-the-counter (OTC) products, wellness vitamins, baby care, herbal formulations, and diagnostic devices do not require a prescription."
  },
  {
    category: "Prescriptions & Ordering",
    question: "How do I upload my doctor's prescription?",
    answer: "You can click on 'Upload Rx' in the header navigation or select the quick upload banner. Take a clear photo or upload a PDF of your prescription. Our licensed pharmacists verify the medication, check for drug interactions, and prepare your cart within 15 minutes."
  },
  {
    category: "Delivery & Express Shipping",
    question: "How does the 2-Hour Express Delivery work?",
    answer: "Express delivery is available across serviced pin codes from our licensed temperature-controlled hub pharmacies. Orders placed between 7:00 AM and 10:00 PM are dispatched via cold-chain delivery riders and delivered to your doorstep within 120 minutes."
  },
  {
    category: "Quality & Safety Guarantee",
    question: "How do you guarantee that medicines are 100% genuine?",
    answer: "Sanjeevani Pharmacy sources all medicines directly from certified pharmaceutical manufacturers (Cipla, Sun Pharma, GSK, Abbott, etc.) or their authorized C&F agents. Every batch comes with manufacturer COA (Certificate of Analysis) and is stored in WHO-standard cold-chain facilities (2°C - 8°C for biologics and < 25°C for standard formulations)."
  },
  {
    category: "Returns & Exchanges",
    question: "What is your return policy on medications?",
    answer: "Unopened medicines in their original intact blister/strip packaging can be returned within 7 days of delivery with no questions asked. Temperature-sensitive cold-chain items (such as insulin or vaccines) cannot be returned once delivered to ensure patient safety."
  },
  {
    category: "Generic Substitutes",
    question: "Can I choose cheaper generic substitutes for my prescribed brand?",
    answer: "Yes! Every prescription product page lists certified bioequivalent generic alternatives that contain the exact same active pharmaceutical ingredient (salt) at up to 40% lower cost. Our registered pharmacists can also advise you before dispatch."
  }
];

// Calendar Health Awareness Days & Holiday Offers
const HEALTH_DAYS = [
  { month: 1, day: 1, name: "New Year's Day Mega Sale", offer: "35% OFF", code: "NEWYEAR35", icon: "🎆", desc: "Whole day site-wide 35% OFF on every purchase!" },
  { month: 1, day: 30, name: "World Leprosy Day", offer: "35% OFF", code: "HEALTH35", icon: "🎗️", desc: "Special 35% OFF on skin hygiene & therapeutic medicines" },
  { month: 2, day: 4, name: "World Cancer Day", offer: "35% OFF", code: "HEALTH35", icon: "🎗️", desc: "Special 35% OFF on essential care & oncology wellness" },
  { month: 3, day: 20, name: "World Oral Health Day", offer: "35% OFF", code: "HEALTH35", icon: "🦷", desc: "35% OFF on oral care, antiseptics & dental products" },
  { month: 3, day: 24, name: "World TB Day", offer: "35% OFF", code: "HEALTH35", icon: "🫁", desc: "35% OFF on respiratory & pulmonology healthcare" },
  { month: 4, day: 7, name: "World Health Day", offer: "35% OFF", code: "HEALTH35", icon: "🌍", desc: "Global Health Day: 35% OFF on every delivery site-wide!" },
  { month: 4, day: 25, name: "World Malaria Day", offer: "35% OFF", code: "HEALTH35", icon: "🦟", desc: "35% OFF on anti-malarial, fever & OTC infection relief" },
  { month: 5, day: 30, name: "Sanjeevani Special Offer Day", offer: "25% OFF", code: "MAY25", icon: "🎁", desc: "Special May 30th offer: 25% OFF on every order!" },
  { month: 5, day: 31, name: "World No Tobacco Day", offer: "35% OFF", code: "HEALTH35", icon: "🚭", desc: "35% OFF on nicotine replacement & wellness care" },
  { month: 6, day: 14, name: "World Blood Donor Day", offer: "35% OFF", code: "HEALTH35", icon: "🩸", desc: "35% OFF on iron, blood supplements & vital tonics" },
  { month: 7, day: 28, name: "World Hepatitis Day", offer: "35% OFF", code: "HEALTH35", icon: "🎗️", desc: "35% OFF on liver care (Liv.52) & digestive healthcare" },
  { month: 9, day: 17, name: "World Patient Safety Day", offer: "35% OFF", code: "HEALTH35", icon: "🛡️", desc: "35% OFF on patient safety & genuine certified care" },
  { month: 10, day: 10, name: "World Mental Health Day", offer: "35% OFF", code: "HEALTH35", icon: "🧠", desc: "35% OFF on stress relief, sleep aids & neuro supplements" },
  { month: 11, day: 14, name: "World Diabetes Day", offer: "35% OFF", code: "HEALTH35", icon: "💙", desc: "35% OFF on diabetes care, glucometer strips & Metformin" },
  { month: 12, day: 1, name: "World AIDS Day", offer: "35% OFF", code: "HEALTH35", icon: "🔴", desc: "35% OFF on immune boosters & sexual health care" }
];

function getTodayHealthDay() {
  const today = new Date();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  return HEALTH_DAYS.find(hd => hd.month === m && hd.day === d) || null;
}
