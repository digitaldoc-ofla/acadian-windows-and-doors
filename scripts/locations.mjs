// Service-area content for the location pages.
// Every city has its own copy (architecture, climate, wood, neighborhoods, FAQs)
// so each page stands on its own rather than being a find-and-replace template.
//
// Art specs use the same options as the homepage illustrations:
//   { type: "door" | "window" | "special", opts: {...} }

export const SITE_URL = "https://www.example.com"; // TODO: set the real domain, then re-run the build

export const LOCATIONS = [
  {
    slug: "new-orleans",
    city: "New Orleans",
    region: "Greater New Orleans",
    parish: "Orleans Parish",
    title: "Custom Wood Windows & Doors in New Orleans, LA",
    meta: "Custom-milled wood windows, French doors and arched entries for New Orleans homes, from French Quarter townhouses to Uptown shotguns. Sinker cypress and rare woods.",
    h1: "Custom wood windows & doors for New Orleans homes",
    tagline: "French Quarter townhouses, Uptown shotguns and Garden District grandeur.",
    intro: [
      "Few cities ask more of a window or door than New Orleans. Tall French doors open onto iron-lace balconies, transoms crown nearly every entry, and the millwork has to survive heat, humidity and hurricane season while looking like it has always been there.",
      "We mill windows and doors to match the profiles, proportions and woods of your home, whether you're restoring a Creole cottage in the Marigny or building new in Lakeview.",
    ],
    hero: { type: "door", opts: { wood: "sinker-cypress", top: "square", glass: "divided", layout: "double", hardware: "iron", lite: "full" } },
    heroCaption: "Full-length French doors in sinker cypress, the classic New Orleans balcony opening",
    styles: [
      {
        name: "Creole Townhouses & Cottages",
        desc: "Full-length French doors take the place of windows, opening onto balconies and banquettes. We build them tall, with true divided lites, to the exact height of your openings.",
        art: { type: "door", opts: { wood: "spanish-cedar", top: "square", glass: "divided", layout: "double", hardware: "iron", lite: "full" } },
      },
      {
        name: "Shotguns & Camelbacks",
        desc: "On a narrow front, every opening counts: a paneled door under a transom and tall windows beside it. We match original moldings, transom bars and proportions.",
        art: { type: "window", opts: { wood: "heart-pine", top: "square" } },
      },
      {
        name: "Garden District Revivals",
        desc: "Greek Revival and Italianate homes call for grand entries: double doors, sidelights, fanlights and arched-top windows scaled to soaring ceilings.",
        art: { type: "door", opts: { wood: "mahogany", top: "arch", glass: "leaded", layout: "double", hardware: "brass", lite: "upper" } },
      },
    ],
    climate: {
      title: "Built for New Orleans weather",
      body: "Moisture is the enemy of wood here, and Formosan termites are a well-known threat across the city. Wood choice and joinery matter as much as design.",
      points: [
        "Rot- and insect-resistant heartwoods like sinker cypress and Spanish cedar",
        "Traditional mortise-and-tenon joints that hold tight through humidity swings",
        "Finishes and sealing chosen for heat, sun and storm season",
      ],
    },
    wood: {
      key: "sinker-cypress",
      why: "Cypress has been the wood of New Orleans millwork for generations. Sinker cypress gives you that same heritage, with the density of old-growth timber.",
    },
    historic:
      "Planning work in the French Quarter or another local historic district? Exterior changes there generally go through the Vieux Carré Commission or the Historic District Landmarks Commission. We can provide detailed drawings and wood specifications to support your application.",
    neighborhoods: ["French Quarter", "Faubourg Marigny", "Bywater", "Tremé", "Garden District", "Lower Garden District", "Irish Channel", "Uptown", "Mid-City", "Esplanade Ridge", "Lakeview", "Algiers Point"],
    nearby: ["Metairie", "Kenner", "Harahan", "River Ridge", "Gretna", "Chalmette", "Belle Chasse"],
    faqs: [
      {
        q: "Can you match the original millwork on my historic New Orleans home?",
        a: "Yes. We measure your existing windows and doors, profile the moldings and muntins, and mill new pieces to match, so new work sits comfortably beside the old.",
      },
      {
        q: "Can you build French doors to replace a window onto a balcony?",
        a: "Converting a window to full-length French doors is a classic New Orleans upgrade. We'll size and build the doors to your opening and ceiling height.",
      },
      {
        q: "What wood holds up best in New Orleans humidity?",
        a: "Durable heartwoods such as sinker cypress, Spanish cedar and mahogany are excellent choices. We'll help you weigh appearance, budget and exposure for each opening.",
      },
    ],
    related: ["northshore", "houma-thibodaux", "baton-rouge"],
  },

  {
    slug: "baton-rouge",
    city: "Baton Rouge",
    region: "Capital Region",
    parish: "East Baton Rouge Parish",
    title: "Custom Wood Windows & Doors in Baton Rouge, LA",
    meta: "Custom wood entry doors, French doors and windows for Baton Rouge homes, from Spanish Town cottages to new French Country estates. Designed with you, milled to last.",
    h1: "Custom wood windows & doors for Baton Rouge homes",
    tagline: "Spanish Town cottages, Garden District bungalows and new French Country estates.",
    intro: [
      "Baton Rouge homes span two centuries, from cottages in Spanish Town and Beauregard Town to 1920s bungalows in the Garden District and new French Country estates off Highland Road. Each calls for something different at the front door.",
      "We design and mill windows and doors around your home's style and your family's wants, in woods chosen to last through the Capital Region's heat and humidity.",
    ],
    hero: { type: "door", opts: { wood: "heart-pine", top: "segment", glass: "divided", layout: "double", hardware: "bronze", lite: "upper" } },
    heroCaption: "Segment-top double entry in reclaimed heart pine with oil-rubbed bronze hardware",
    styles: [
      {
        name: "Historic Downtown Cottages",
        desc: "Spanish Town and Beauregard Town cottages and shotguns call for paneled doors, transoms and tall windows milled to their original proportions.",
        art: { type: "door", opts: { wood: "heart-pine", top: "square", glass: "solid", layout: "single", hardware: "bronze", lite: "upper" } },
      },
      {
        name: "Garden District Bungalows & Revivals",
        desc: "Craftsman, Tudor and Colonial Revival homes from the 1920s and '30s, with divided-lite casements, arched entries and leaded glass accents.",
        art: { type: "door", opts: { wood: "white-oak", top: "segment", glass: "leaded", layout: "double", hardware: "iron", lite: "upper" } },
      },
      {
        name: "New French Country & Acadian Homes",
        desc: "Grand arched entries, segment-top windows and round accent windows give new construction instant character and a sense of place.",
        art: { type: "special", opts: { shape: "circle", pattern: "wheel", glass: "clear", wood: "sinker-cypress" } },
      },
    ],
    climate: {
      title: "Built for the Capital Region",
      body: "Long, humid summers and heavy rains put wood to the test. We build for them from the first cut.",
      points: [
        "Heartwood species with natural rot resistance",
        "Sills and drip edges shaped to shed water away from joints",
        "Finishes chosen for strong south and west sun",
      ],
    },
    wood: {
      key: "heart-pine",
      why: "Reclaimed longleaf heart pine echoes the floors and trim found in many older Baton Rouge homes, with a warm amber glow that deepens over time.",
    },
    historic:
      "Spanish Town and Beauregard Town are among the city's oldest neighborhoods. If your project needs historic review, we'll provide drawings and specifications early so approval doesn't hold you up.",
    neighborhoods: ["Spanish Town", "Beauregard Town", "Garden District", "Capital Heights", "Mid City", "Southdowns", "University / LSU area", "Highland Road", "Shenandoah", "Country Club of Louisiana"],
    nearby: ["Prairieville", "Gonzales", "Zachary", "Central", "Denham Springs", "Walker", "Port Allen", "Plaquemine"],
    faqs: [
      {
        q: "Do you work on new construction as well as renovations?",
        a: "Yes. We work with homeowners, builders and architects on new homes, and with homeowners on renovations and restorations. The earlier we're involved, the more design options you'll have.",
      },
      {
        q: "How long do custom windows and doors take?",
        a: "It depends on the size of the project and the wood you choose. You'll get a clear timeline along with your quote.",
      },
      {
        q: "Can I see wood samples before choosing?",
        a: "Yes. Samples are part of every design consultation, so you can see and feel each species before you decide.",
      },
    ],
    related: ["new-orleans", "st-francisville", "lafayette"],
  },

  {
    slug: "lafayette",
    city: "Lafayette",
    region: "Acadiana",
    parish: "Lafayette Parish",
    title: "Custom Wood Windows & Doors in Lafayette & Acadiana",
    meta: "Acadian-style wood doors, gallery French doors and custom windows for Lafayette and Acadiana homes, milled from sinker cypress and rare woods.",
    h1: "Custom wood windows & doors in Lafayette & Acadiana",
    tagline: "The heart of Acadiana, with Acadian cottages, Creole galleries and new classics.",
    intro: [
      "This is the heart of Acadiana, and the country our name comes from. The Acadian cottage, with its steep roof, deep front gallery and simple, sturdy openings, is the architecture of home here, and it still shapes the best new houses being built today.",
      "From restorations near downtown to new homes in River Ranch, Youngsville and Broussard, we craft windows and doors with the proportions and character this region is known for.",
    ],
    hero: { type: "door", opts: { wood: "sinker-cypress", top: "square", glass: "divided", layout: "double", hardware: "brass", lite: "upper" } },
    heroCaption: "Gallery French doors in sinker cypress, a classic Acadian opening",
    styles: [
      {
        name: "Acadian Cottages",
        desc: "Raised cottages with a full-width gallery call for paneled or half-glass doors, pairs of French doors onto the porch, and simple divided-lite windows.",
        art: { type: "door", opts: { wood: "sinker-cypress", top: "square", glass: "solid", layout: "double", hardware: "iron", lite: "upper" } },
      },
      {
        name: "Creole Plantation Style",
        desc: "Wide galleries with French doors on every bay and transoms above. Elegant openings designed to keep air moving through the house.",
        art: { type: "door", opts: { wood: "spanish-cedar", top: "segment", glass: "divided", layout: "double", hardware: "brass", lite: "full" } },
      },
      {
        name: "New Acadian & French Country",
        desc: "Today's custom homes borrow the old forms and add a statement: an arched entry, a round gable window or a sunburst over the door.",
        art: { type: "special", opts: { shape: "demilune", pattern: "sunburst", glass: "amber", wood: "sinker-cypress" } },
      },
    ],
    climate: {
      title: "Built for South Louisiana",
      body: "Heat, humidity and summer storms are a given in Acadiana. Wood and joinery have to be chosen with that in mind.",
      points: [
        "Sinker cypress recovered from Louisiana waters",
        "Joinery glued and pinned for lasting strength",
        "Finishes that can be refreshed rather than replaced",
      ],
    },
    wood: {
      key: "sinker-cypress",
      why: "Bald cypress was cut across the Atchafalaya Basin and south Louisiana's swamps a century ago, and some of those logs never made it to the mill. Recovered sinker cypress is as local as wood gets.",
    },
    neighborhoods: ["Downtown Lafayette", "Saint Streets", "Oil Center", "River Ranch", "Sugar Mill Pond", "Bendel Gardens"],
    nearby: ["Youngsville", "Broussard", "Carencro", "Scott", "Breaux Bridge", "St. Martinville", "New Iberia", "Abbeville", "Opelousas", "Crowley"],
    faqs: [
      {
        q: "What makes a door or window \"Acadian style\"?",
        a: "Simplicity and proportion: tall, narrow openings, paneled or half-glass doors, divided-lite windows and generous transoms. We can keep it traditional or add a refined touch like an arched top.",
      },
      {
        q: "Can you build French doors for a porch or gallery wall?",
        a: "Yes. Pairs of French doors along a gallery are a classic Acadiana look, and we size them to your porch and ceiling height.",
      },
      {
        q: "Do you offer local wood?",
        a: "Sinker cypress is recovered from Louisiana waters, so it's about as local as it gets. We also offer heart pine, mahogany, white oak, walnut and Spanish cedar.",
      },
    ],
    related: ["lake-charles", "baton-rouge", "houma-thibodaux"],
  },

  {
    slug: "lake-charles",
    city: "Lake Charles",
    region: "Southwest Louisiana",
    parish: "Calcasieu Parish",
    title: "Custom Wood Windows & Doors in Lake Charles, LA",
    meta: "Custom wood windows and doors for Lake Charles and Southwest Louisiana: Charpentier District restorations, rebuilds and new homes, built for Gulf Coast weather.",
    h1: "Custom wood windows & doors for Lake Charles & Southwest Louisiana",
    tagline: "Charpentier District Victorians, coastal raised homes and lakefront rebuilds.",
    intro: [
      "Southwest Louisiana knows rebuilding. Since the hurricanes of 2020, many Lake Charles homeowners have been restoring and rebuilding, and a home's windows and doors are a chance to bring back character that's hard to find off the shelf.",
      "We craft custom windows and doors for historic homes in the Charpentier District, new builds in Moss Bluff and Sulphur, and everything in between.",
    ],
    hero: { type: "door", opts: { wood: "mahogany", top: "segment", glass: "leaded", layout: "single", hardware: "brass", lite: "upper" } },
    heroCaption: "Segment-top mahogany entry with leaded glass and sidelights",
    styles: [
      {
        name: "Charpentier District Victorians",
        desc: "The district takes its name from the carpenters who built it (charpentier is French for carpenter). Its Queen Anne and Victorian homes feature paneled entries, transoms and decorative glass, and we mill to match.",
        art: { type: "door", opts: { wood: "heart-pine", top: "segment", glass: "leaded", layout: "single", hardware: "brass", lite: "upper" } },
      },
      {
        name: "Gulf Coast Raised Homes",
        desc: "Raised homes and coastal cottages need openings that handle wind-driven rain and full sun without giving up their beauty.",
        art: { type: "window", opts: { wood: "spanish-cedar", top: "square" } },
      },
      {
        name: "Lakefront Statement Homes",
        desc: "Big views deserve big openings: arched transoms, full-lite French doors and oval or round accent windows.",
        art: { type: "special", opts: { shape: "oval", pattern: "cross", glass: "clear", wood: "mahogany" } },
      },
    ],
    climate: {
      title: "Built for the Gulf Coast",
      body: "Salt air, wind-driven rain and storm season shape every recommendation we make here.",
      points: [
        "Durable heartwoods and exterior-grade glues",
        "Careful sill, drip and weatherstrip details",
        "Glass and storm-protection options discussed up front",
      ],
    },
    wood: {
      key: "mahogany",
      why: "Genuine mahogany is dimensionally stable and holds a finish beautifully, making it a strong choice for exposed coastal openings.",
    },
    neighborhoods: ["Charpentier Historic District", "Downtown Lake Charles", "South Lake Charles", "Prien Lake", "Graywood"],
    nearby: ["Sulphur", "Westlake", "Moss Bluff", "Iowa", "Vinton", "Jennings", "DeRidder"],
    faqs: [
      {
        q: "Can wood windows and doors work in a hurricane-prone area?",
        a: "Yes, with the right wood, construction and glass. During design we'll talk through storm-protection and glass options for your home's exposure.",
      },
      {
        q: "Can you rebuild windows and doors that were lost in a storm?",
        a: "We can mill replacements to match what was lost, working from photos, salvaged pieces or measurements of surviving openings.",
      },
      {
        q: "Can you match decorative glass in an older home?",
        a: "We offer leaded and decorative glass options and will work toward a close match from photos or a surviving piece.",
      },
    ],
    related: ["lafayette", "houma-thibodaux", "new-orleans"],
  },

  {
    slug: "northshore",
    city: "Covington & Mandeville",
    region: "The Northshore",
    parish: "St. Tammany Parish",
    title: "Custom Wood Windows & Doors in Covington & Mandeville, LA",
    meta: "Custom wood entry doors, French doors and windows for Northshore homes in Covington, Mandeville, Madisonville and across St. Tammany Parish.",
    h1: "Custom wood windows & doors on the Northshore",
    tagline: "Old Mandeville cottages, Covington estates and lakefront living.",
    intro: [
      "From Old Mandeville cottages near the lakefront to estate homes in Covington, Madisonville and Folsom, the Northshore is home to some of Louisiana's most beautiful custom houses. The front door is where that story starts.",
      "We design and mill windows and doors for Northshore homeowners, builders and architects, in rare woods and in the styles that suit St. Tammany's piney woods and waterfront living.",
    ],
    hero: { type: "door", opts: { wood: "walnut", top: "arch", glass: "leaded", layout: "double", hardware: "brass", lite: "upper" } },
    heroCaption: "Arched double entry in black walnut with leaded diamond glass",
    styles: [
      {
        name: "Old Mandeville & Covington Cottages",
        desc: "Raised cottages with deep porches: half-glass doors, tall windows and transoms that let the breeze through.",
        art: { type: "door", opts: { wood: "white-oak", top: "square", glass: "divided", layout: "single", hardware: "iron", lite: "upper" } },
      },
      {
        name: "Northshore Estates",
        desc: "French Country and Louisiana-style estates call for grand arched double entries with fanlights and sidelights.",
        art: { type: "door", opts: { wood: "walnut", top: "arch", glass: "divided", layout: "double", hardware: "brass", lite: "upper" } },
      },
      {
        name: "Lakefront & Riverfront Homes",
        desc: "Walls of French doors facing the water, eyebrow windows over wide openings and round accents in the gables.",
        art: { type: "special", opts: { shape: "eyebrow", pattern: "grid", glass: "clear", wood: "sinker-cypress" } },
      },
    ],
    climate: {
      title: "Built for lake & river living",
      body: "Humidity rolls off Lake Pontchartrain and the Tchefuncte and Bogue Falaya rivers, and summer storms come with it.",
      points: [
        "Species with natural rot resistance",
        "Sealed end grain and careful finishing on every piece",
        "Designs that shed water and stay square",
      ],
    },
    wood: {
      key: "white-oak",
      why: "Quarter-sawn white oak pairs strength and weather resistance with a refined, lighter look that suits the Northshore's newer homes.",
    },
    neighborhoods: ["Old Mandeville", "Downtown Covington", "Madisonville", "Abita Springs", "Folsom", "Lacombe", "Slidell"],
    nearby: ["Hammond", "Ponchatoula", "Pearl River", "Bush", "Lewisburg"],
    faqs: [
      {
        q: "Do you work with builders and architects?",
        a: "Yes. We're glad to work from architectural drawings, coordinate with your builder and provide shop drawings for approval.",
      },
      {
        q: "Can you build a matching set of windows and doors for a whole house?",
        a: "Yes. With a whole-home package, every profile, wood tone and finish matches, from the front door to the back porch.",
      },
      {
        q: "Can I get a round or arched window for my gable?",
        a: "Absolutely. Oculus, oval, eyebrow, gothic and sunburst windows can all be built to fit your gable.",
      },
    ],
    related: ["new-orleans", "baton-rouge", "st-francisville"],
  },

  {
    slug: "shreveport-bossier",
    city: "Shreveport–Bossier",
    region: "Northwest Louisiana",
    parish: "Caddo & Bossier Parishes",
    title: "Custom Wood Windows & Doors in Shreveport & Bossier City, LA",
    meta: "Custom wood windows and doors for Shreveport and Bossier City homes: Highland Craftsman bungalows, South Highlands Tudors and grand Fairfield Avenue entries.",
    h1: "Custom wood windows & doors in Shreveport–Bossier",
    tagline: "Highland bungalows, South Highlands Tudors and grand Fairfield Avenue homes.",
    intro: [
      "North Louisiana has its own architecture: Craftsman bungalows in Highland, Tudor and Colonial Revival homes in South Highlands and Broadmoor, and stately houses along Fairfield Avenue. Each deserves windows and doors as well built as the house itself.",
      "We mill custom windows and doors for restorations and new homes across Shreveport, Bossier City and the surrounding communities.",
    ],
    hero: { type: "door", opts: { wood: "white-oak", top: "square", glass: "divided", layout: "single", hardware: "bronze", lite: "upper" } },
    heroCaption: "Craftsman-inspired entry in quarter-sawn white oak with sidelights",
    styles: [
      {
        name: "Craftsman Bungalows",
        desc: "Highland's bungalows call for doors with simple upper lites, divided-upper windows and the ray-fleck figure of quarter-sawn oak.",
        art: { type: "door", opts: { wood: "white-oak", top: "square", glass: "divided", layout: "single", hardware: "bronze", lite: "upper" } },
      },
      {
        name: "Tudor & Revival Homes",
        desc: "Arched entries, leaded diamond glass and casement windows return these homes to their original charm.",
        art: { type: "door", opts: { wood: "walnut", top: "segment", glass: "leaded", layout: "single", hardware: "iron", lite: "upper" } },
      },
      {
        name: "Fairfield Avenue Classics",
        desc: "Grand entries with fanlights and sidelights, and tall windows sized for generous ceilings.",
        art: { type: "door", opts: { wood: "mahogany", top: "arch", glass: "divided", layout: "double", hardware: "brass", lite: "upper" } },
      },
    ],
    climate: {
      title: "Built for North Louisiana",
      body: "Summers here are hot and humid and winters bring real cold snaps, and that swing makes wood move. Construction has to allow for it.",
      points: [
        "Stable, quarter-sawn, properly dried lumber",
        "Panels that float in their frames to allow seasonal movement",
        "Weatherstripping chosen for both heat and cold",
      ],
    },
    wood: {
      key: "white-oak",
      why: "Quarter-sawn white oak is the traditional Arts & Crafts wood, prized for its ray-fleck figure, strength and weather resistance.",
    },
    neighborhoods: ["Highland", "South Highlands", "Broadmoor", "Fairfield", "Downtown Shreveport", "Bossier City"],
    nearby: ["Benton", "Haughton", "Minden", "Greenwood", "Keithville"],
    faqs: [
      {
        q: "Can you build Craftsman-style doors and windows?",
        a: "Yes. Craftsman designs, with their clean lines, honest joinery and quarter-sawn oak, are a natural fit for custom millwork.",
      },
      {
        q: "Will wood windows handle north Louisiana winters?",
        a: "Yes. Well-built wood windows with good weatherstripping and quality glass perform well in heat and cold. We'll go over glass options during design.",
      },
      {
        q: "Can I mix wood species in one project?",
        a: "Yes. Some clients choose a showpiece wood for the front entry and a complementary species for the windows. We'll make sure the tones and finishes work together.",
      },
    ],
    related: ["baton-rouge", "lafayette", "st-francisville"],
  },

  {
    slug: "houma-thibodaux",
    city: "Houma & Thibodaux",
    region: "Bayou Region",
    parish: "Terrebonne & Lafourche Parishes",
    title: "Custom Wood Windows & Doors in Houma & Thibodaux, LA",
    meta: "Custom wood windows and doors for Houma, Thibodaux and Louisiana's bayou country, built for coastal weather in sinker cypress and other durable woods.",
    h1: "Custom wood windows & doors in Houma, Thibodaux & Bayou Country",
    tagline: "Bayou Creole cottages, raised homes and historic downtown Thibodaux.",
    intro: [
      "Along Bayou Lafourche and Bayou Terrebonne, homes are built with water in mind: raised high, with deep porches and openings meant to catch every breeze. Since Hurricane Ida in 2021, many families have been rebuilding and choosing windows and doors to last.",
      "We craft custom windows and doors for historic downtown Thibodaux, raised homes and camps down the bayou, and new homes across Terrebonne and Lafourche parishes.",
    ],
    hero: { type: "door", opts: { wood: "sinker-cypress", top: "segment", glass: "divided", layout: "single", hardware: "iron", lite: "upper" } },
    heroCaption: "Segment-top single entry with sidelights in sinker cypress",
    styles: [
      {
        name: "Bayou Creole Cottages",
        desc: "Simple, sturdy and beautiful: paneled doors, French doors onto the gallery and tall shuttered windows.",
        art: { type: "window", opts: { wood: "sinker-cypress", top: "square" } },
      },
      {
        name: "Raised Homes & Camps",
        desc: "Elevated homes need openings that stand up to wind and weather, and a front door worth climbing the stairs for.",
        art: { type: "door", opts: { wood: "spanish-cedar", top: "square", glass: "solid", layout: "double", hardware: "iron", lite: "upper" } },
      },
      {
        name: "Historic Downtown Thibodaux",
        desc: "Victorian and Greek Revival homes with transoms, sidelights and decorative glass, restored with matching millwork.",
        art: { type: "door", opts: { wood: "heart-pine", top: "arch", glass: "leaded", layout: "single", hardware: "brass", lite: "upper" } },
      },
    ],
    climate: {
      title: "Built for the coast",
      body: "Salt air, high humidity and hurricane season are part of life on the bayou.",
      points: [
        "Naturally durable woods like sinker cypress",
        "Sealed end grain and storm-ready details",
        "Storm-protection and glass options discussed early",
      ],
    },
    wood: {
      key: "sinker-cypress",
      why: "South Louisiana's cypress swamps were logged heavily a century ago. Sinker cypress brings that history home in one of the most durable woods there is.",
    },
    neighborhoods: ["Downtown Houma", "Downtown Thibodaux", "Bayou Blue", "Schriever", "Gray", "Raceland", "Lockport"],
    nearby: ["Chauvin", "Montegut", "Larose", "Galliano", "Cut Off", "Morgan City"],
    faqs: [
      {
        q: "Can you rebuild windows and doors lost in a storm to match my home's original style?",
        a: "Yes. From photos, salvaged pieces or surviving openings, we can mill replacements that bring back your home's original character.",
      },
      {
        q: "Are wood doors a good choice for a raised coastal home?",
        a: "Yes, with the right species, construction and finish. Durable heartwoods, careful joinery and regular finish care let wood doors thrive on the coast.",
      },
      {
        q: "What maintenance do wood windows need near the coast?",
        a: "Periodic inspection and a refresh of the exterior finish, more often on sunny or salt-exposed sides. We'll give you care guidance specific to your wood and finish.",
      },
    ],
    related: ["new-orleans", "lafayette", "lake-charles"],
  },

  {
    slug: "st-francisville",
    city: "St. Francisville",
    region: "The Felicianas",
    parish: "West & East Feliciana Parishes",
    title: "Custom Wood Windows & Doors in St. Francisville & the Felicianas",
    meta: "Custom wood windows and doors for St. Francisville and the Felicianas, including plantation-home restorations, historic cottages and new country estates.",
    h1: "Custom wood windows & doors in St. Francisville & the Felicianas",
    tagline: "Plantation homes, historic cottages and new estates in the hills.",
    intro: [
      "With its antebellum plantation homes, historic downtown and rolling, oak-shaded hills, St. Francisville is one of Louisiana's most architecturally rich small towns. Homes here deserve millwork with the same sense of history.",
      "We craft windows and doors for restorations, sympathetic additions and new homes in West and East Feliciana, built to look as though they've always belonged.",
    ],
    hero: { type: "door", opts: { wood: "mahogany", top: "arch", glass: "solid", layout: "double", hardware: "brass", lite: "upper" } },
    heroCaption: "Arched double entry in mahogany with a carved sunburst head",
    styles: [
      {
        name: "Plantation Homes",
        desc: "Federal and Greek Revival plantation homes feature tall multi-pane windows, paneled double doors and elegant fanlights.",
        art: { type: "door", opts: { wood: "mahogany", top: "arch", glass: "solid", layout: "double", hardware: "brass", lite: "upper" } },
      },
      {
        name: "Historic Downtown Cottages",
        desc: "Downtown's historic cottages and storefronts call for paneled doors, transoms and true divided-lite windows.",
        art: { type: "window", opts: { wood: "white-oak", top: "arch" } },
      },
      {
        name: "Country Estates",
        desc: "New homes in the hills call for character: arched entries, round or quatrefoil gable windows and doors milled from rare woods.",
        art: { type: "special", opts: { shape: "quatrefoil", pattern: "cross", glass: "clear", wood: "sinker-cypress" } },
      },
    ],
    climate: {
      title: "Built for the Felicianas",
      body: "Shady, humid hillsides and long summers mean wood has to be chosen and finished to resist moisture.",
      points: [
        "Rot-resistant heartwoods",
        "Lumber properly dried and acclimated before milling",
        "Finishes matched to a historic appearance",
      ],
    },
    wood: {
      key: "heart-pine",
      why: "Heart pine was a common building wood in historic homes like these. Reclaimed heart pine lets new work match the old in color and character.",
    },
    neighborhoods: ["Downtown St. Francisville", "West Feliciana Parish", "Jackson", "Clinton", "Wakefield", "Ethel"],
    nearby: ["Zachary", "New Roads", "Baker", "Slaughter"],
    faqs: [
      {
        q: "Can you make new doors for an addition that match my historic house?",
        a: "Yes. We match profiles, proportions, wood species and finish so the addition reads as part of the original home.",
      },
      {
        q: "Will new millwork look out of place on an old house?",
        a: "Not when it's done right. Matching profiles, proportions and wood lets new windows and doors sit naturally beside original work.",
      },
      {
        q: "How do we get started?",
        a: "Request a consultation below. We'll talk through your project, visit if needed, and bring wood samples and ideas.",
      },
    ],
    related: ["baton-rouge", "northshore", "new-orleans"],
  },
];
