// ═══════════════════════════════════════════════════════════
//  GEO DROP  –  game.js
// ═══════════════════════════════════════════════════════════

// ── Country / Capital data ──────────────────────────────────
// tier: 1=easy (famous capitals), 2=medium, 3=hard (obscure)
const COUNTRIES = [
  // ── Europe ─────────────────────────────────────────────────
  { country: "France",          capital: "Paris",           flag: "🇫🇷", code: "fr", continent: "Europe",      population: "68M",  language: "French",        currency: "Euro",       tier: 1 },
  { country: "Germany",         capital: "Berlin",          flag: "🇩🇪", code: "de", continent: "Europe",      population: "84M",  language: "German",        currency: "Euro",       tier: 1 },
  { country: "Italy",           capital: "Rome",            flag: "🇮🇹", code: "it", continent: "Europe",      population: "59M",  language: "Italian",       currency: "Euro",       tier: 1 },
  { country: "Spain",           capital: "Madrid",          flag: "🇪🇸", code: "es", continent: "Europe",      population: "47M",  language: "Spanish",       currency: "Euro",       tier: 1 },
  { country: "Portugal",        capital: "Lisbon",          flag: "🇵🇹", code: "pt", continent: "Europe",      population: "10M",  language: "Portuguese",    currency: "Euro",       tier: 1 },
  { country: "Greece",          capital: "Athens",          flag: "🇬🇷", code: "gr", continent: "Europe",      population: "11M",  language: "Greek",         currency: "Euro",       tier: 1 },
  { country: "Sweden",          capital: "Stockholm",       flag: "🇸🇪", code: "se", continent: "Europe",      population: "10M",  language: "Swedish",       currency: "Krona",      tier: 1 },
  { country: "Norway",          capital: "Oslo",            flag: "🇳🇴", code: "no", continent: "Europe",      population: "5M",   language: "Norwegian",     currency: "Krone",      tier: 1 },
  { country: "Denmark",         capital: "Copenhagen",      flag: "🇩🇰", code: "dk", continent: "Europe",      population: "6M",   language: "Danish",        currency: "Krone",      tier: 1 },
  { country: "Netherlands",     capital: "Amsterdam",       flag: "🇳🇱", code: "nl", continent: "Europe",      population: "17M",  language: "Dutch",         currency: "Euro",       tier: 1 },
  { country: "Belgium",         capital: "Brussels",        flag: "🇧🇪", code: "be", continent: "Europe",      population: "11M",  language: "Dutch/French",  currency: "Euro",       tier: 2 },
  { country: "Switzerland",     capital: "Bern",            flag: "🇨🇭", code: "ch", continent: "Europe",      population: "9M",   language: "German/French", currency: "Franc",      tier: 2 },
  { country: "Austria",         capital: "Vienna",          flag: "🇦🇹", code: "at", continent: "Europe",      population: "9M",   language: "German",        currency: "Euro",       tier: 1 },
  { country: "Poland",          capital: "Warsaw",          flag: "🇵🇱", code: "pl", continent: "Europe",      population: "38M",  language: "Polish",        currency: "Złoty",      tier: 1 },
  { country: "Ukraine",         capital: "Kyiv",            flag: "🇺🇦", code: "ua", continent: "Europe",      population: "44M",  language: "Ukrainian",     currency: "Hryvnia",    tier: 2 },
  { country: "Romania",         capital: "Bucharest",       flag: "🇷🇴", code: "ro", continent: "Europe",      population: "19M",  language: "Romanian",      currency: "Leu",        tier: 2 },
  { country: "Hungary",         capital: "Budapest",        flag: "🇭🇺", code: "hu", continent: "Europe",      population: "10M",  language: "Hungarian",     currency: "Forint",     tier: 2 },
  { country: "Czech Republic",  capital: "Prague",          flag: "🇨🇿", code: "cz", continent: "Europe",      population: "11M",  language: "Czech",         currency: "Koruna",     tier: 2 },
  { country: "Finland",         capital: "Helsinki",        flag: "🇫🇮", code: "fi", continent: "Europe",      population: "6M",   language: "Finnish",       currency: "Euro",       tier: 2 },
  { country: "Russia",          capital: "Moscow",          flag: "🇷🇺", code: "ru", continent: "Europe",      population: "144M", language: "Russian",       currency: "Ruble",      tier: 1 },
  { country: "Serbia",          capital: "Belgrade",        flag: "🇷🇸", code: "rs", continent: "Europe",      population: "7M",   language: "Serbian",       currency: "Dinar",      tier: 2 },
  { country: "Croatia",         capital: "Zagreb",          flag: "🇭🇷", code: "hr", continent: "Europe",      population: "4M",   language: "Croatian",      currency: "Euro",       tier: 2 },
  { country: "Slovakia",        capital: "Bratislava",      flag: "🇸🇰", code: "sk", continent: "Europe",      population: "5M",   language: "Slovak",        currency: "Euro",       tier: 3 },
  { country: "Bulgaria",        capital: "Sofia",           flag: "🇧🇬", code: "bg", continent: "Europe",      population: "7M",   language: "Bulgarian",     currency: "Lev",        tier: 2 },
  { country: "Ireland",         capital: "Dublin",          flag: "🇮🇪", code: "ie", continent: "Europe",      population: "5M",   language: "English",       currency: "Euro",       tier: 1 },
  { country: "UK",              capital: "London",          flag: "🇬🇧", code: "gb", continent: "Europe",      population: "67M",  language: "English",       currency: "Pound",      tier: 1 },
  { country: "Iceland",         capital: "Reykjavik",       flag: "🇮🇸", code: "is", continent: "Europe",      population: "0.4M", language: "Icelandic",     currency: "Króna",      tier: 2 },
  { country: "Luxembourg",      capital: "Luxembourg City", flag: "🇱🇺", code: "lu", continent: "Europe",      population: "0.7M", language: "Luxembourgish", currency: "Euro",       tier: 3 },
  { country: "Albania",         capital: "Tirana",          flag: "🇦🇱", code: "al", continent: "Europe",      population: "3M",   language: "Albanian",      currency: "Lek",        tier: 3 },
  { country: "Lithuania",       capital: "Vilnius",         flag: "🇱🇹", code: "lt", continent: "Europe",      population: "3M",   language: "Lithuanian",    currency: "Euro",       tier: 3 },
  { country: "Latvia",          capital: "Riga",            flag: "🇱🇻", code: "lv", continent: "Europe",      population: "2M",   language: "Latvian",       currency: "Euro",       tier: 3 },
  { country: "Estonia",         capital: "Tallinn",         flag: "🇪🇪", code: "ee", continent: "Europe",      population: "1.3M", language: "Estonian",      currency: "Euro",       tier: 3 },
  { country: "Belarus",         capital: "Minsk",           flag: "🇧🇾", code: "by", continent: "Europe",      population: "9M",   language: "Belarusian",    currency: "Ruble",      tier: 3 },
  { country: "Slovenia",        capital: "Ljubljana",       flag: "🇸🇮", code: "si", continent: "Europe",      population: "2M",   language: "Slovene",       currency: "Euro",       tier: 3 },
  { country: "North Macedonia",  capital: "Skopje",          flag: "🇲🇰", code: "mk", continent: "Europe",      population: "2M",   language: "Macedonian",    currency: "Denar",      tier: 3 },
  { country: "Moldova",         capital: "Chișinău",        flag: "🇲🇩", code: "md", continent: "Europe",      population: "3M",   language: "Romanian",      currency: "Leu",        tier: 3 },
  // ── Asia ───────────────────────────────────────────────────
  { country: "Japan",           capital: "Tokyo",           flag: "🇯🇵", code: "jp", continent: "Asia",        population: "125M", language: "Japanese",      currency: "Yen",        tier: 1 },
  { country: "China",           capital: "Beijing",         flag: "🇨🇳", code: "cn", continent: "Asia",        population: "1.4B", language: "Mandarin",      currency: "Yuan",       tier: 1 },
  { country: "India",           capital: "New Delhi",       flag: "🇮🇳", code: "in", continent: "Asia",        population: "1.4B", language: "Hindi",         currency: "Rupee",      tier: 1 },
  { country: "South Korea",     capital: "Seoul",           flag: "🇰🇷", code: "kr", continent: "Asia",        population: "52M",  language: "Korean",        currency: "Won",        tier: 1 },
  { country: "Thailand",        capital: "Bangkok",         flag: "🇹🇭", code: "th", continent: "Asia",        population: "72M",  language: "Thai",          currency: "Baht",       tier: 1 },
  { country: "Vietnam",         capital: "Hanoi",           flag: "🇻🇳", code: "vn", continent: "Asia",        population: "98M",  language: "Vietnamese",    currency: "Dong",       tier: 2 },
  { country: "Indonesia",       capital: "Jakarta",         flag: "🇮🇩", code: "id", continent: "Asia",        population: "277M", language: "Indonesian",    currency: "Rupiah",     tier: 2 },
  { country: "Malaysia",        capital: "Kuala Lumpur",    flag: "🇲🇾", code: "my", continent: "Asia",        population: "33M",  language: "Malay",         currency: "Ringgit",    tier: 2 },
  { country: "Philippines",     capital: "Manila",          flag: "🇵🇭", code: "ph", continent: "Asia",        population: "115M", language: "Filipino",      currency: "Peso",       tier: 2 },
  { country: "Pakistan",        capital: "Islamabad",       flag: "🇵🇰", code: "pk", continent: "Asia",        population: "231M", language: "Urdu",          currency: "Rupee",      tier: 2 },
  { country: "Bangladesh",      capital: "Dhaka",           flag: "🇧🇩", code: "bd", continent: "Asia",        population: "170M", language: "Bengali",       currency: "Taka",       tier: 2 },
  { country: "Singapore",       capital: "Singapore",       flag: "🇸🇬", code: "sg", continent: "Asia",        population: "6M",   language: "English",       currency: "Dollar",     tier: 2 },
  { country: "Myanmar",         capital: "Naypyidaw",       flag: "🇲🇲", code: "mm", continent: "Asia",        population: "55M",  language: "Burmese",       currency: "Kyat",       tier: 3 },
  { country: "Sri Lanka",       capital: "Sri Jayawardenepura Kotte", flag: "🇱🇰", code: "lk", continent: "Asia", population: "22M", language: "Sinhala",   currency: "Rupee",      tier: 3 },
  { country: "Nepal",           capital: "Kathmandu",       flag: "🇳🇵", code: "np", continent: "Asia",        population: "30M",  language: "Nepali",        currency: "Rupee",      tier: 2 },
  { country: "Mongolia",        capital: "Ulaanbaatar",     flag: "🇲🇳", code: "mn", continent: "Asia",        population: "3M",   language: "Mongolian",     currency: "Tögrög",     tier: 3 },
  { country: "Cambodia",        capital: "Phnom Penh",      flag: "🇰🇭", code: "kh", continent: "Asia",        population: "17M",  language: "Khmer",         currency: "Riel",       tier: 3 },
  { country: "Laos",            capital: "Vientiane",       flag: "🇱🇦", code: "la", continent: "Asia",        population: "7M",   language: "Lao",           currency: "Kip",        tier: 3 },
  { country: "North Korea",     capital: "Pyongyang",       flag: "🇰🇵", code: "kp", continent: "Asia",        population: "26M",  language: "Korean",        currency: "Won",        tier: 2 },
  { country: "Taiwan",          capital: "Taipei",          flag: "🇹🇼", code: "tw", continent: "Asia",        population: "24M",  language: "Mandarin",      currency: "Dollar",     tier: 2 },
  { country: "Kazakhstan",      capital: "Astana",          flag: "🇰🇿", code: "kz", continent: "Asia",        population: "19M",  language: "Kazakh",        currency: "Tenge",      tier: 3 },
  { country: "Uzbekistan",      capital: "Tashkent",        flag: "🇺🇿", code: "uz", continent: "Asia",        population: "36M",  language: "Uzbek",         currency: "Som",        tier: 3 },
  { country: "Afghanistan",     capital: "Kabul",           flag: "🇦🇫", code: "af", continent: "Asia",        population: "42M",  language: "Pashto/Dari",   currency: "Afghani",    tier: 2 },
  // ── Africa ─────────────────────────────────────────────────
  { country: "Egypt",           capital: "Cairo",           flag: "🇪🇬", code: "eg", continent: "Africa",      population: "105M", language: "Arabic",        currency: "Pound",      tier: 1 },
  { country: "Nigeria",         capital: "Abuja",           flag: "🇳🇬", code: "ng", continent: "Africa",      population: "223M", language: "English",       currency: "Naira",      tier: 1 },
  { country: "South Africa",    capital: "Pretoria",        flag: "🇿🇦", code: "za", continent: "Africa",      population: "60M",  language: "Zulu/English",  currency: "Rand",       tier: 1 },
  { country: "Kenya",           capital: "Nairobi",         flag: "🇰🇪", code: "ke", continent: "Africa",      population: "55M",  language: "Swahili",       currency: "Shilling",   tier: 2 },
  { country: "Morocco",         capital: "Rabat",           flag: "🇲🇦", code: "ma", continent: "Africa",      population: "38M",  language: "Arabic",        currency: "Dirham",     tier: 2 },
  { country: "Algeria",         capital: "Algiers",         flag: "🇩🇿", code: "dz", continent: "Africa",      population: "46M",  language: "Arabic",        currency: "Dinar",      tier: 2 },
  { country: "Ethiopia",        capital: "Addis Ababa",     flag: "🇪🇹", code: "et", continent: "Africa",      population: "126M", language: "Amharic",       currency: "Birr",       tier: 2 },
  { country: "Ghana",           capital: "Accra",           flag: "🇬🇭", code: "gh", continent: "Africa",      population: "33M",  language: "English",       currency: "Cedi",       tier: 2 },
  { country: "Tanzania",        capital: "Dodoma",          flag: "🇹🇿", code: "tz", continent: "Africa",      population: "65M",  language: "Swahili",       currency: "Shilling",   tier: 3 },
  { country: "Uganda",          capital: "Kampala",         flag: "🇺🇬", code: "ug", continent: "Africa",      population: "48M",  language: "English",       currency: "Shilling",   tier: 3 },
  { country: "Mozambique",      capital: "Maputo",          flag: "🇲🇿", code: "mz", continent: "Africa",      population: "33M",  language: "Portuguese",    currency: "Metical",    tier: 3 },
  { country: "Senegal",         capital: "Dakar",           flag: "🇸🇳", code: "sn", continent: "Africa",      population: "17M",  language: "French",        currency: "CFA Franc",  tier: 3 },
  { country: "Cameroon",        capital: "Yaoundé",         flag: "🇨🇲", code: "cm", continent: "Africa",      population: "28M",  language: "French",        currency: "CFA Franc",  tier: 3 },
  { country: "Zimbabwe",        capital: "Harare",          flag: "🇿🇼", code: "zw", continent: "Africa",      population: "16M",  language: "English",       currency: "Dollar",     tier: 3 },
  { country: "Tunisia",         capital: "Tunis",           flag: "🇹🇳", code: "tn", continent: "Africa",      population: "12M",  language: "Arabic",        currency: "Dinar",      tier: 2 },
  { country: "Ivory Coast",     capital: "Yamoussoukro",    flag: "🇨🇮", code: "ci", continent: "Africa",      population: "27M",  language: "French",        currency: "CFA Franc",  tier: 3 },
  { country: "Angola",          capital: "Luanda",          flag: "🇦🇴", code: "ao", continent: "Africa",      population: "35M",  language: "Portuguese",    currency: "Kwanza",     tier: 3 },
  { country: "Mali",            capital: "Bamako",          flag: "🇲🇱", code: "ml", continent: "Africa",      population: "22M",  language: "French",        currency: "CFA Franc",  tier: 3 },
  { country: "Zambia",          capital: "Lusaka",          flag: "🇿🇲", code: "zm", continent: "Africa",      population: "20M",  language: "English",       currency: "Kwacha",     tier: 3 },
  { country: "Rwanda",          capital: "Kigali",          flag: "🇷🇼", code: "rw", continent: "Africa",      population: "14M",  language: "Kinyarwanda",   currency: "Franc",      tier: 3 },
  { country: "Sudan",           capital: "Khartoum",        flag: "🇸🇩", code: "sd", continent: "Africa",      population: "46M",  language: "Arabic",        currency: "Pound",      tier: 3 },
  { country: "Libya",           capital: "Tripoli",         flag: "🇱🇾", code: "ly", continent: "Africa",      population: "7M",   language: "Arabic",        currency: "Dinar",      tier: 2 },
  { country: "Botswana",        capital: "Gaborone",        flag: "🇧🇼", code: "bw", continent: "Africa",      population: "2.6M", language: "English",       currency: "Pula",       tier: 3 },
  { country: "Namibia",         capital: "Windhoek",        flag: "🇳🇦", code: "na", continent: "Africa",      population: "2.6M", language: "English",       currency: "Dollar",     tier: 3 },
  { country: "Madagascar",      capital: "Antananarivo",    flag: "🇲🇬", code: "mg", continent: "Africa",      population: "28M",  language: "Malagasy",      currency: "Ariary",     tier: 3 },
  // ── Americas ───────────────────────────────────────────────
  { country: "USA",             capital: "Washington D.C.", flag: "🇺🇸", code: "us", continent: "Americas",    population: "335M", language: "English",       currency: "Dollar",     tier: 1 },
  { country: "Canada",          capital: "Ottawa",          flag: "🇨🇦", code: "ca", continent: "Americas",    population: "38M",  language: "English",       currency: "Dollar",     tier: 1 },
  { country: "Mexico",          capital: "Mexico City",     flag: "🇲🇽", code: "mx", continent: "Americas",    population: "130M", language: "Spanish",       currency: "Peso",       tier: 1 },
  { country: "Brazil",          capital: "Brasília",        flag: "🇧🇷", code: "br", continent: "Americas",    population: "215M", language: "Portuguese",    currency: "Real",       tier: 1 },
  { country: "Argentina",       capital: "Buenos Aires",    flag: "🇦🇷", code: "ar", continent: "Americas",    population: "46M",  language: "Spanish",       currency: "Peso",       tier: 1 },
  { country: "Cuba",            capital: "Havana",          flag: "🇨🇺", code: "cu", continent: "Americas",    population: "11M",  language: "Spanish",       currency: "Peso",       tier: 2 },
  { country: "Peru",            capital: "Lima",            flag: "🇵🇪", code: "pe", continent: "Americas",    population: "33M",  language: "Spanish",       currency: "Sol",        tier: 2 },
  { country: "Colombia",        capital: "Bogotá",          flag: "🇨🇴", code: "co", continent: "Americas",    population: "52M",  language: "Spanish",       currency: "Peso",       tier: 2 },
  { country: "Chile",           capital: "Santiago",        flag: "🇨🇱", code: "cl", continent: "Americas",    population: "19M",  language: "Spanish",       currency: "Peso",       tier: 2 },
  { country: "Venezuela",       capital: "Caracas",         flag: "🇻🇪", code: "ve", continent: "Americas",    population: "29M",  language: "Spanish",       currency: "Bolívar",    tier: 2 },
  { country: "Ecuador",         capital: "Quito",           flag: "🇪🇨", code: "ec", continent: "Americas",    population: "18M",  language: "Spanish",       currency: "Dollar",     tier: 2 },
  { country: "Bolivia",         capital: "Sucre",           flag: "🇧🇴", code: "bo", continent: "Americas",    population: "12M",  language: "Spanish",       currency: "Boliviano",  tier: 3 },
  { country: "Paraguay",        capital: "Asunción",        flag: "🇵🇾", code: "py", continent: "Americas",    population: "7M",   language: "Spanish",       currency: "Guaraní",    tier: 3 },
  { country: "Uruguay",         capital: "Montevideo",      flag: "🇺🇾", code: "uy", continent: "Americas",    population: "3.5M", language: "Spanish",       currency: "Peso",       tier: 2 },
  { country: "Guatemala",       capital: "Guatemala City",  flag: "🇬🇹", code: "gt", continent: "Americas",    population: "17M",  language: "Spanish",       currency: "Quetzal",    tier: 3 },
  { country: "Costa Rica",      capital: "San José",        flag: "🇨🇷", code: "cr", continent: "Americas",    population: "5M",   language: "Spanish",       currency: "Colón",      tier: 3 },
  { country: "Panama",          capital: "Panama City",     flag: "🇵🇦", code: "pa", continent: "Americas",    population: "4M",   language: "Spanish",       currency: "Balboa",     tier: 3 },
  { country: "Jamaica",         capital: "Kingston",        flag: "🇯🇲", code: "jm", continent: "Americas",    population: "3M",   language: "English",       currency: "Dollar",     tier: 3 },
  { country: "Honduras",        capital: "Tegucigalpa",     flag: "🇭🇳", code: "hn", continent: "Americas",    population: "10M",  language: "Spanish",       currency: "Lempira",    tier: 3 },
  // ── Oceania ────────────────────────────────────────────────
  { country: "Australia",       capital: "Canberra",        flag: "🇦🇺", code: "au", continent: "Oceania",     population: "26M",  language: "English",       currency: "Dollar",     tier: 1 },
  { country: "New Zealand",     capital: "Wellington",      flag: "🇳🇿", code: "nz", continent: "Oceania",     population: "5M",   language: "English",       currency: "Dollar",     tier: 1 },
  { country: "Papua New Guinea", capital: "Port Moresby",   flag: "🇵🇬", code: "pg", continent: "Oceania",     population: "10M",  language: "English",       currency: "Kina",       tier: 3 },
  { country: "Fiji",            capital: "Suva",            flag: "🇫🇯", code: "fj", continent: "Oceania",     population: "0.9M", language: "English",       currency: "Dollar",     tier: 3 },
  { country: "Samoa",           capital: "Apia",            flag: "🇼🇸", code: "ws", continent: "Oceania",     population: "0.2M", language: "Samoan",        currency: "Tālā",       tier: 3 },
  { country: "Vanuatu",         capital: "Port Vila",       flag: "🇻🇺", code: "vu", continent: "Oceania",     population: "0.3M", language: "Bislama",       currency: "Vatu",       tier: 3 },
  // ── Middle East ─────────────────────────────────────────────
  { country: "Turkey",          capital: "Ankara",          flag: "🇹🇷", code: "tr", continent: "Middle East", population: "85M",  language: "Turkish",       currency: "Lira",       tier: 1 },
  { country: "Saudi Arabia",    capital: "Riyadh",          flag: "🇸🇦", code: "sa", continent: "Middle East", population: "36M",  language: "Arabic",        currency: "Riyal",      tier: 1 },
  { country: "Iran",            capital: "Tehran",          flag: "🇮🇷", code: "ir", continent: "Middle East", population: "89M",  language: "Persian",       currency: "Rial",       tier: 2 },
  { country: "Iraq",            capital: "Baghdad",         flag: "🇮🇶", code: "iq", continent: "Middle East", population: "43M",  language: "Arabic",        currency: "Dinar",      tier: 2 },
  { country: "Israel",          capital: "Jerusalem",       flag: "🇮🇱", code: "il", continent: "Middle East", population: "9M",   language: "Hebrew",        currency: "Shekel",     tier: 2 },
  { country: "Jordan",          capital: "Amman",           flag: "🇯🇴", code: "jo", continent: "Middle East", population: "10M",  language: "Arabic",        currency: "Dinar",      tier: 2 },
  { country: "UAE",             capital: "Abu Dhabi",       flag: "🇦🇪", code: "ae", continent: "Middle East", population: "9M",   language: "Arabic",        currency: "Dirham",     tier: 1 },
  { country: "Qatar",           capital: "Doha",            flag: "🇶🇦", code: "qa", continent: "Middle East", population: "2.9M", language: "Arabic",        currency: "Riyal",      tier: 2 },
  { country: "Kuwait",          capital: "Kuwait City",     flag: "🇰🇼", code: "kw", continent: "Middle East", population: "4.3M", language: "Arabic",        currency: "Dinar",      tier: 3 },
  { country: "Bahrain",         capital: "Manama",          flag: "🇧🇭", code: "bh", continent: "Middle East", population: "1.5M", language: "Arabic",        currency: "Dinar",      tier: 3 },
  { country: "Oman",            capital: "Muscat",          flag: "🇴🇲", code: "om", continent: "Middle East", population: "4.5M", language: "Arabic",        currency: "Rial",       tier: 3 },
  { country: "Yemen",           capital: "Sana'a",          flag: "🇾🇪", code: "ye", continent: "Middle East", population: "34M",  language: "Arabic",        currency: "Rial",       tier: 3 },
  { country: "Syria",           capital: "Damascus",        flag: "🇸🇾", code: "sy", continent: "Middle East", population: "22M",  language: "Arabic",        currency: "Pound",      tier: 2 },
  { country: "Lebanon",         capital: "Beirut",          flag: "🇱🇧", code: "lb", continent: "Middle East", population: "5M",   language: "Arabic",        currency: "Pound",      tier: 2 },
  { country: "Armenia",         capital: "Yerevan",         flag: "🇦🇲", code: "am", continent: "Middle East", population: "3M",   language: "Armenian",      currency: "Dram",       tier: 3 },
  { country: "Georgia",         capital: "Tbilisi",         flag: "🇬🇪", code: "ge", continent: "Middle East", population: "4M",   language: "Georgian",      currency: "Lari",       tier: 3 },
  { country: "Azerbaijan",      capital: "Baku",            flag: "🇦🇿", code: "az", continent: "Middle East", population: "10M",  language: "Azerbaijani",   currency: "Manat",      tier: 3 },
];

// ── Difficulty settings ─────────────────────────────────────
const DIFFICULTY = {
  easy:   { dropSpeed: 1.5, dropInterval: 1800, distractors: 1, lives: 5, tier: 1 },
  medium: { dropSpeed: 2.0, dropInterval: 1400, distractors: 2, lives: 3, tier: 2 },
  hard:   { dropSpeed: 2.8, dropInterval: 1000, distractors: 2, lives: 2, tier: 3 },
};

// ── Colour palette for capsules ──────────────────────────────
const CAPSULE_COLORS = [
  "#f7c948", "#ff6b6b", "#4ecca3", "#7e82ff",
  "#ff9f43", "#a29bfe", "#fd79a8", "#55efc4",
];

// ── Mode colours ─────────────────────────────────────────────
const MODE_STYLE = {
  capitalMode: { rgb: "78,204,163",  hex: "#4ecca3" },
  countryMode:  { rgb: "162,155,254", hex: "#a29bfe" },
  marathon:     { rgb: "247,201,72",  hex: "#f7c948" },
  flagMode:     { rgb: "253,121,168", hex: "#fd79a8" },
};

// ── Basket Skins ─────────────────────────────────────────────
const SKINS = [
  { id: "classic", name: "Classic", threshold: 0,   icon: "🧺", rgb: null,          hex: null },
  { id: "fire",    name: "Inferno", threshold: 50,  icon: "🔥", rgb: "255,107,107", hex: "#ff6b6b" },
  { id: "galaxy",  name: "Galaxy",  threshold: 150, icon: "🌌", rgb: "126,130,255", hex: "#7e82ff" },
  { id: "gold",    name: "Golden",  threshold: 300, icon: "✨", rgb: "247,201,72",  hex: "#f7c948" },
  { id: "neon",    name: "Neon",    threshold: 500, icon: "⚡", rgb: "85,239,196",  hex: "#55efc4" },
];

// ════════════════════════════════════════════════════════════
//  FLAG IMAGE CACHE  (flagcdn.com 40×30 PNGs)
// ════════════════════════════════════════════════════════════
const FLAG_CACHE = {};   // code → HTMLImageElement (or null if failed)

function getFlagImg(code) {
  if (!code) return null;
  if (FLAG_CACHE[code] !== undefined) return FLAG_CACHE[code];
  // Start loading; mark as pending (null) until done
  FLAG_CACHE[code] = null;
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload  = () => { FLAG_CACHE[code] = img; };
  img.onerror = () => { FLAG_CACHE[code] = null; };
  img.src = `https://flagcdn.com/w160/${code}.png`;
  return null;   // not ready yet — caller will retry next frame
}

// Pre-warm the cache: start loading flags for all countries immediately
function prewarmFlags() {
  COUNTRIES.forEach(c => { if (c.code) getFlagImg(c.code); });
}

// ════════════════════════════════════════════════════════════
//  WEB AUDIO – synthesised sound effects (no files needed)
// ════════════════════════════════════════════════════════════
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return _audioCtx;
}

const SFX = {
  /** Pleasant ascending chime on correct catch */
  catch() {
    try {
      const ac  = getAudioCtx();
      const now = ac.currentTime;
      [0, 0.08, 0.16].forEach((delay, i) => {
        const osc  = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain); gain.connect(ac.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime([523, 659, 784][i], now + delay);
        gain.gain.setValueAtTime(0.18, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.35);
        osc.start(now + delay);
        osc.stop(now + delay + 0.36);
      });
    } catch(e) {}
  },

  /** Deep thud on wrong catch / miss */
  miss() {
    try {
      const ac  = getAudioCtx();
      const now = ac.currentTime;
      const osc  = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.25);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now); osc.stop(now + 0.3);
    } catch(e) {}
  },

  /** Bright fanfare for level-up */
  levelUp() {
    try {
      const ac  = getAudioCtx();
      const now = ac.currentTime;
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        const osc  = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain); gain.connect(ac.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.15, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.42);
      });
    } catch(e) {}
  },

  /** Short electric zap for speed-up alert */
  speedUp() {
    try {
      const ac  = getAudioCtx();
      const now = ac.currentTime;
      const osc  = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(900, now + 0.18);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now); osc.stop(now + 0.23);
    } catch(e) {}
  },

  /** Gentle pop when game starts */
  start() {
    try {
      const ac  = getAudioCtx();
      const now = ac.currentTime;
      [0, 0.1].forEach((d, i) => {
        const osc  = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain); gain.connect(ac.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime([440, 660][i], now + d);
        gain.gain.setValueAtTime(0.13, now + d);
        gain.gain.exponentialRampToValueAtTime(0.001, now + d + 0.3);
        osc.start(now + d); osc.stop(now + d + 0.32);
      });
    } catch(e) {}
  },
};

// ── DOM refs ────────────────────────────────────────────────
const startScreen    = document.getElementById("startScreen");
const gameScreen     = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const learnScreen    = document.getElementById("learnScreen");
const canvas         = document.getElementById("gameCanvas");
const ctx            = canvas.getContext("2d");
const scoreEl        = document.getElementById("score");
const levelEl        = document.getElementById("level");
const countryLabel   = document.getElementById("countryLabel");
const livesDisplay   = document.getElementById("livesDisplay");
const modeBadgeEl    = document.getElementById("modeBadge");
const streakDisplay  = document.getElementById("streakDisplay");
const pauseOverlay   = document.getElementById("pauseOverlay");
const finalScoreEl   = document.getElementById("finalScore");
const bestScoreEl    = document.getElementById("bestScore");
const finalLevelEl   = document.getElementById("finalLevel");
const finalModeEl    = document.getElementById("finalMode");
const finalMessageEl = document.getElementById("finalMessage");

// ── Background Music ─────────────────────────────────────────
const bgMusic      = document.getElementById("bgMusic");
const musicToggle  = document.getElementById("musicToggle");
let   musicMuted   = localStorage.getItem("geodrop_muted") === "true";
let   musicStarted = false;

bgMusic.volume = 0.45;

function applyMuteState() {
  bgMusic.muted           = musicMuted;
  musicToggle.textContent = musicMuted ? "🔇" : "🔊";
  musicToggle.classList.toggle("muted", musicMuted);
}
function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
  bgMusic.play().catch(() => { musicStarted = false; });
}
musicToggle.addEventListener("click", () => {
  musicMuted = !musicMuted;
  localStorage.setItem("geodrop_muted", musicMuted);
  applyMuteState();
  if (!musicMuted) startMusic();
});
applyMuteState();

// ── Pause button wiring ─────────────────────────────────────
document.getElementById("pauseBtn").addEventListener("click", togglePause);
document.getElementById("resumeBtn").addEventListener("click", togglePause);
document.getElementById("pauseMenuBtn").addEventListener("click", () => {
  if (state.paused) togglePause();
  showMenu();
});

// ── State ───────────────────────────────────────────────────
let state          = {};
let animId         = null;
let selectedDiff   = "easy";
let selectedMode   = "capitalMode";
let selectedRegion = "all";
let selectedSkin   = localStorage.getItem("geodrop_skin") || "classic";
let bestScore      = parseInt(localStorage.getItem("geodrop_best") || "0");

// ── Leaderboard helpers ──────────────────────────────────────
function getLeaderboard() {
  try { return JSON.parse(localStorage.getItem("geodrop_leaderboard") || "[]"); }
  catch(e) { return []; }
}
function saveToLeaderboard(name, score, mode, level) {
  const lb = getLeaderboard();
  lb.push({ name: name.trim().slice(0, 20) || "Anonymous", score, mode, level, date: new Date().toLocaleDateString() });
  lb.sort((a, b) => b.score - a.score);
  lb.splice(5);
  localStorage.setItem("geodrop_leaderboard", JSON.stringify(lb));
}

// ── Wrong-answer tracking (weak spots) ──────────────────────
function getWeakMap() {
  try { return JSON.parse(localStorage.getItem("geodrop_weak") || "{}"); }
  catch(e) { return {}; }
}
function recordAnswer(country, correct) {
  const map = getWeakMap();
  if (!map[country]) map[country] = { wrong: 0, total: 0 };
  map[country].total++;
  if (!correct) map[country].wrong++;
  localStorage.setItem("geodrop_weak", JSON.stringify(map));
}

// ── Mode buttons ─────────────────────────────────────────────
const HOW_TO = {
  capitalMode: [
    "🧺 The basket shows a <strong>country name</strong>",
    "💧 Capitals rain down from the top",
    "⬅️ ➡️ Move with <strong>Arrow keys</strong> or drag on mobile",
    "✅ Catch the <strong>correct capital</strong> for points",
    "❌ Wrong answers cost you a life",
  ],
  countryMode: [
    "🗺️ The basket shows a <strong>capital city</strong>",
    "💧 Country names rain down from the top",
    "⬅️ ➡️ Move with <strong>Arrow keys</strong> or drag on mobile",
    "✅ Catch the <strong>correct country</strong> for points",
    "❌ Wrong answers cost you a life",
  ],
  marathon: [
    "🔁 Questions <strong>alternate</strong> between Capital Hunt and Country Hunt",
    "💧 Capitals AND country names rain down",
    "⬅️ ➡️ Move with <strong>Arrow keys</strong> or drag on mobile",
    "✅ Catch whichever the <strong>badge tells you</strong>",
    "❌ Wrong answers cost you a life",
  ],
  flagMode: [
    "🏳️ The basket shows a <strong>flag emoji</strong>",
    "💧 Country names rain down from the top",
    "⬅️ ➡️ Move with <strong>Arrow keys</strong> or drag on mobile",
    "✅ Catch the <strong>correct country</strong> for that flag",
    "❌ Wrong answers cost you a life",
  ],
};

document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedMode = btn.dataset.mode;
    updateHowTo();
  });
});

function updateHowTo() {
  const list = document.getElementById("howToList");
  const key  = HOW_TO[selectedMode] ? selectedMode : "capitalMode";
  list.innerHTML = HOW_TO[key].map(t => `<li>${t}</li>`).join("");
}

// ── Region buttons ───────────────────────────────────────────
document.querySelectorAll(".region-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".region-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedRegion = btn.dataset.region;
  });
});

// ── Difficulty buttons ──────────────────────────────────────
document.querySelectorAll(".diff-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".diff-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedDiff = btn.dataset.diff;
  });
});

// ── Skin selector ───────────────────────────────────────────
function buildSkinSelector() {
  const container = document.getElementById("skinBtns");
  if (!container) return;
  container.innerHTML = "";
  SKINS.forEach(skin => {
    const unlocked = bestScore >= skin.threshold;
    const btn = document.createElement("button");
    btn.className  = "skin-btn" + (selectedSkin === skin.id ? " active" : "") + (unlocked ? "" : " locked");
    btn.dataset.skin = skin.id;
    btn.title      = unlocked ? skin.name : `Unlock at ${skin.threshold} pts`;
    btn.innerHTML  = `<span class="skin-icon">${skin.icon}</span><span class="skin-name">${skin.name}</span>`
      + (unlocked ? "" : `<span class="skin-lock">🔒${skin.threshold}</span>`);
    if (unlocked) {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".skin-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedSkin = skin.id;
        localStorage.setItem("geodrop_skin", skin.id);
      });
    }
    container.appendChild(btn);
  });
}

// ── Leaderboard display ─────────────────────────────────────
function buildLeaderboardDisplay() {
  const lb   = getLeaderboard();
  const html = lb.length === 0
    ? `<div class="lb-empty">No scores yet — play your first game!</div>`
    : lb.map((entry, i) => `
    <div class="lb-row ${i === 0 ? "lb-gold" : i === 1 ? "lb-silver" : i === 2 ? "lb-bronze" : ""}">
      <span class="lb-rank">${["🥇","🥈","🥉","4","5"][i]}</span>
      <span class="lb-name">${escapeHtml(entry.name)}</span>
      <span class="lb-score">${entry.score} pts</span>
      <span class="lb-meta">Lv.${entry.level} · ${entry.date}</span>
    </div>`).join("");
  const preview = document.getElementById("leaderboardListPreview");
  const full    = document.getElementById("leaderboardListFull");
  if (preview) preview.innerHTML = html;
  if (full)    full.innerHTML    = html;
}

function escapeHtml(s) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// ════════════════════════════════════════════════════════════
//  VIBRATION  — unlock on first touch, then use throughout
// ════════════════════════════════════════════════════════════
let vibrationUnlocked = false;

function vibrate(pattern) {
  if (!navigator.vibrate) return;
  if (!vibrationUnlocked) return;        // wait for unlock
  try { navigator.vibrate(pattern); } catch(e) {}
}

// Unlock vibration on very first user touch anywhere on the page
function unlockVibration() {
  if (vibrationUnlocked) return;
  vibrationUnlocked = true;
  // Send a zero-length pulse to "warm up" the vibrator API
  try { navigator.vibrate(0); } catch(e) {}
  document.removeEventListener("touchstart", unlockVibration, true);
  document.removeEventListener("pointerdown", unlockVibration, true);
}
document.addEventListener("touchstart",  unlockVibration, { once: true, capture: true, passive: true });
document.addEventListener("pointerdown", unlockVibration, { once: true, capture: true, passive: true });

// ── Button wire-ups ─────────────────────────────────────────
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restartBtn").addEventListener("click", startGame);
document.getElementById("menuBtn").addEventListener("click", showMenu);
document.getElementById("learnBtn").addEventListener("click", showLearnScreen);
document.getElementById("learnBtn2").addEventListener("click", showLearnScreen);
document.getElementById("learnBackBtn").addEventListener("click", showMenu);
document.getElementById("leaderboardBtn").addEventListener("click", () => {
  buildLeaderboardDisplay();
  showScreen("leaderboardScreen");
});
document.getElementById("leaderboardBackBtn").addEventListener("click", showMenu);

document.getElementById("submitNameBtn").addEventListener("click", submitNameAndSave);
document.getElementById("skipNameBtn").addEventListener("click", () => {
  saveToLeaderboard("Anonymous", pendingScore.score, pendingScore.mode, pendingScore.level);
  document.getElementById("nameModal").classList.add("hidden");
  buildLeaderboardDisplay();
  showScreen("gameOverScreen");
});
document.getElementById("playerNameInput").addEventListener("keydown", e => {
  if (e.key === "Enter") submitNameAndSave();
});

let pendingScore = null;
function submitNameAndSave() {
  const name = document.getElementById("playerNameInput").value;
  saveToLeaderboard(name, pendingScore.score, pendingScore.mode, pendingScore.level);
  document.getElementById("nameModal").classList.add("hidden");
  buildLeaderboardDisplay();
  showScreen("gameOverScreen");
}

// ── Keyboard ────────────────────────────────────────────────
const keys = {};
window.addEventListener("keydown", e => {
  keys[e.key] = true;
  if (["ArrowLeft","ArrowRight"," "].includes(e.key)) e.preventDefault();
  if (e.key === "Escape" && state.running) togglePause();
});
window.addEventListener("keyup", e => { keys[e.key] = false; });

// ── Mobile controls (tap buttons) ───────────────────────────
const leftBtn  = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
leftBtn.addEventListener("pointerdown",   () => { keys["ArrowLeft"]  = true;  });
leftBtn.addEventListener("pointerup",     () => { keys["ArrowLeft"]  = false; });
leftBtn.addEventListener("pointerleave",  () => { keys["ArrowLeft"]  = false; });
rightBtn.addEventListener("pointerdown",  () => { keys["ArrowRight"] = true;  });
rightBtn.addEventListener("pointerup",    () => { keys["ArrowRight"] = false; });
rightBtn.addEventListener("pointerleave", () => { keys["ArrowRight"] = false; });

// ── Touch/drag to move basket ─────────────────────────────────
// Touching anywhere on the canvas drags the basket to that X
let touchDragActive = false;
canvas.addEventListener("touchstart", e => {
  if (!state.running || state.paused) return;
  touchDragActive = true;
  e.preventDefault();
  const t = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  state.basket.x = Math.max(state.basket.w / 2, Math.min(canvas.width - state.basket.w / 2, t.clientX - rect.left));
}, { passive: false });

canvas.addEventListener("touchmove", e => {
  if (!state.running || state.paused || !touchDragActive) return;
  e.preventDefault();
  const t = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  state.basket.x = Math.max(state.basket.w / 2, Math.min(canvas.width - state.basket.w / 2, t.clientX - rect.left));
}, { passive: false });

canvas.addEventListener("touchend", () => { touchDragActive = false; });

// Mouse drag on canvas (desktop convenience)
let mouseDrag = false;
canvas.addEventListener("mousedown", e => {
  if (!state.running || state.paused) return;
  mouseDrag = true;
  const rect = canvas.getBoundingClientRect();
  state.basket.x = Math.max(state.basket.w / 2, Math.min(canvas.width - state.basket.w / 2, e.clientX - rect.left));
});
canvas.addEventListener("mousemove", e => {
  if (!mouseDrag || !state.running || state.paused) return;
  const rect = canvas.getBoundingClientRect();
  state.basket.x = Math.max(state.basket.w / 2, Math.min(canvas.width - state.basket.w / 2, e.clientX - rect.left));
});
canvas.addEventListener("mouseup",    () => { mouseDrag = false; });
canvas.addEventListener("mouseleave", () => { mouseDrag = false; });

// ════════════════════════════════════════════════════════════
//  RESPONSIVE SCALE HELPER
//  Returns a font-size scaled to the canvas width.
//  Base reference width: 380px (typical phone portrait).
// ════════════════════════════════════════════════════════════
function scaledFont(basePx) {
  // 360px phone portrait → ~0.95×; 390px Pixel → 1×; 760px desktop → 1.4× max
  const scale = Math.min(1.4, Math.max(0.7, canvas.width / 390));
  return Math.round(basePx * scale);
}

// ════════════════════════════════════════════════════════════
//  CANVAS RESIZE
// ════════════════════════════════════════════════════════════
function resizeCanvas() {
  const isMobile = window.innerWidth <= 600;

  if (isMobile) {
    // On mobile: measure exact pixels taken by HUD + controls, give the rest to canvas
    const hud      = document.getElementById("hud");
    const controls = document.getElementById("mobileControls");
    const hudH     = hud.getBoundingClientRect().height      || 0;
    const ctrlH    = controls.getBoundingClientRect().height || 0;
    const W = window.innerWidth;
    const H = Math.max(200, window.innerHeight - hudH - ctrlH);
    canvas.width  = Math.floor(W);
    canvas.height = Math.floor(H);
  } else {
    const area = document.getElementById("gameArea");
    canvas.width  = Math.min(area.clientWidth  - 20, 760);
    canvas.height = Math.max(area.clientHeight - 10, 300);
  }
}
window.addEventListener("resize", () => {
  resizeCanvas();
  if (state.running) repositionBasket();
});

function repositionBasket() {
  if (!state.basket) return;
  state.basket.x = Math.max(
    state.basket.w / 2,
    Math.min(canvas.width - state.basket.w / 2, state.basket.x)
  );
  state.basket.y = canvas.height - state.basket.h - 12;
}

// ════════════════════════════════════════════════════════════
//  SCREENS
// ════════════════════════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
function showMenu() {
  buildSkinSelector();
  buildLeaderboardDisplay();
  showScreen("startScreen");
}

// ── Learn screen ─────────────────────────────────────────────
function showLearnScreen() {
  populateLearnScreen();
  showScreen("learnScreen");
}

function populateLearnScreen() {
  const grid = document.getElementById("learnGrid");
  if (!grid) return;
  const weakMap = getWeakMap();
  grid.innerHTML = COUNTRIES.map(c => {
    const w   = weakMap[c.country];
    const weakBadge = (w && w.wrong > 0)
      ? `<div class="learn-weak">❌ Missed ${w.wrong}×</div>`
      : "";
    return `
    <div class="learn-card" data-continent="${c.continent}">
      <div class="learn-flag">
        <img class="learn-flag-img"
             src="https://flagcdn.com/w160/${c.code}.png"
             alt="${c.country} flag"
             onerror="this.style.display='none';this.nextElementSibling.style.display='inline'"
             loading="lazy" />
        <span class="learn-flag-emoji" style="display:none">${c.flag}</span>
      </div>
      <div class="learn-country">${c.country}</div>
      <div class="learn-capital">🏛️ ${c.capital}</div>
      <div class="learn-continent">${c.continent}</div>
      <div class="learn-facts">
        <span title="Population">👥 ${c.population}</span>
        <span title="Language">🗣️ ${c.language}</span>
        <span title="Currency">💰 ${c.currency}</span>
      </div>
      ${weakBadge}
      <button class="learn-map-btn" onclick="openMapModal('${c.country.replace(/'/g, "\\'")}')" title="View on map">🗺️ Map</button>
    </div>`;
  }).join("");
}

// ── In-app Map Modal ──────────────────────────────────────────
function openMapModal(countryName) {
  const modal   = document.getElementById("mapModal");
  const iframe  = document.getElementById("mapIframe");
  const title   = document.getElementById("mapModalTitle");
  if (!modal || !iframe || !title) return;
  title.textContent = "🗺️ " + countryName;
  // Use OSM embed search — works without lat/lon coordinates
  iframe.src = "https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik&marker=0,0&query=" + encodeURIComponent(countryName);
  modal.classList.remove("hidden");
  // Slight delay then update to real search
  setTimeout(() => {
    iframe.src = "https://www.openstreetmap.org/export/embed.html?query=" + encodeURIComponent(countryName);
  }, 100);
}

document.getElementById("mapModalClose").addEventListener("click", () => {
  const modal  = document.getElementById("mapModal");
  const iframe = document.getElementById("mapIframe");
  if (modal)  modal.classList.add("hidden");
  if (iframe) iframe.src = "";  // stop loading
});

// Close modal on backdrop click
document.getElementById("mapModal").addEventListener("click", e => {
  if (e.target === document.getElementById("mapModal")) {
    document.getElementById("mapModal").classList.add("hidden");
    document.getElementById("mapIframe").src = "";
  }
});

// ── Learn search filter ───────────────────────────────────────
document.getElementById("learnSearch").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll(".learn-card").forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(q) ? "" : "none";
  });
});

// ── Learn continent filter ────────────────────────────────────
document.querySelectorAll(".learn-filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".learn-filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cont = btn.dataset.continent;
    document.querySelectorAll(".learn-card").forEach(card => {
      card.style.display = (cont === "all" || card.dataset.continent === cont) ? "" : "none";
    });
  });
});

// ════════════════════════════════════════════════════════════
//  MODE HELPERS
// ════════════════════════════════════════════════════════════
function questionPool() {
  const diffTier = DIFFICULTY[selectedDiff].tier;
  let pool = COUNTRIES.filter(c => c.tier <= diffTier);
  if (pool.length < 3) pool = COUNTRIES; // safety fallback
  if (selectedRegion !== "all") {
    const regional = pool.filter(c => c.continent === selectedRegion);
    if (regional.length >= 3) return regional;
  }
  return pool;
}

function basketLabel() {
  if (state.mode === "flagMode") return state.flag;
  return state.mode === "capitalMode" ? state.country : state.capital;
}
function correctAnswer() {
  if (state.mode === "flagMode") return state.country;
  return state.mode === "capitalMode" ? state.capital : state.country;
}
function currentFlag() {
  const pool  = questionPool();
  const entry = pool[state.questionIdx] || COUNTRIES[0];
  return entry.flag || "🌐";
}
function wrongAnswerPool(exclude) {
  const pool = questionPool();
  if (state.mode === "capitalMode") {
    return pool.filter(c => c.capital !== exclude).map(c => c.capital);
  } else {
    // countryMode and flagMode both drop country names
    return pool.filter(c => c.country !== exclude).map(c => c.country);
  }
}
function missedMsg()     {
  if (state.mode === "flagMode") return "Missed the country! 💨";
  return state.mode === "capitalMode" ? "Missed the capital! 💨" : "Missed the country! 💨";
}
function wrongCatchMsg() {
  if (state.mode === "flagMode") return "Wrong country! ❌";
  return state.mode === "capitalMode" ? "Wrong capital! ❌" : "Wrong country! ❌";
}

// ════════════════════════════════════════════════════════════
//  START GAME
// ════════════════════════════════════════════════════════════
function startGame() {
  if (animId) cancelAnimationFrame(animId);
  musicStarted = false;
  bgMusic.currentTime = 0;
  showScreen("gameScreen");
  resizeCanvas();

  const diff        = DIFFICULTY[selectedDiff];
  const initialMode = selectedMode === "marathon" ? "capitalMode" : selectedMode;
  const pool        = questionPool();
  const qi          = pickQuestion(pool);

  state = {
    running:       true,
    paused:        false,
    score:         0,
    level:         1,
    lives:         diff.lives,
    maxLives:      diff.lives,
    diff:          selectedDiff,
    diffCfg:       { ...diff },
    mode:          initialMode,
    isMarathon:    selectedMode === "marathon",
    questionIdx:   qi,
    country:       pool[qi].country,
    capital:       pool[qi].capital,
    flag:          pool[qi].flag,
    capsules:      [],
    particles:     [],
    dropTimer:     diff.dropInterval,
    dropInterval:  diff.dropInterval,
    dropQueue:     [],
    correctCount:  0,
    nextLevel:     8,
    streak:        0,
    speedMult:     1.0,
    basket: {
      x:      canvas.width / 2,
      y:      canvas.height - 52,
      w:      initialMode === "flagMode" ? scaledFont(110) : scaledFont(140),
      h:      initialMode === "flagMode" ? scaledFont(58)  : scaledFont(44),
      speed:  Math.round(scaledFont(7)),
      squish: 0,   // 0 = normal, positive = squish-down anim, negative = bounce-up
    },
    shake:    0,
    flashMsg: null,
  };

  updateModeBadge();
  updateHUD();
  startMusic();
  SFX.start();

  lastTime = performance.now();
  animId   = requestAnimationFrame(loop);
}

function updateModeBadge() {
  if (state.mode === "flagMode") {
    modeBadgeEl.textContent = "🏳️ Flag Mode";
    modeBadgeEl.classList.remove("country-mode", "marathon-mode");
    modeBadgeEl.classList.add("flag-mode");
    return;
  }
  modeBadgeEl.classList.remove("flag-mode");
  if (state.mode === "capitalMode") {
    modeBadgeEl.textContent = state.isMarathon ? "🔁 Capital Hunt" : "🧺 Capital Hunt";
    modeBadgeEl.classList.remove("country-mode", "marathon-mode");
    if (state.isMarathon) modeBadgeEl.classList.add("marathon-mode");
  } else {
    modeBadgeEl.textContent = state.isMarathon ? "🔁 Country Hunt" : "🗺️ Country Hunt";
    modeBadgeEl.classList.remove("marathon-mode");
    modeBadgeEl.classList.add("country-mode");
  }
}

// ════════════════════════════════════════════════════════════
//  PAUSE
// ════════════════════════════════════════════════════════════
function togglePause() {
  if (!state.running) return;
  state.paused = !state.paused;
  if (state.paused) {
    cancelAnimationFrame(animId); animId = null;
    pauseOverlay.classList.remove("hidden");
    if (!bgMusic.paused && !bgMusic.muted) bgMusic.volume = 0.15;
  } else {
    pauseOverlay.classList.add("hidden");
    if (!bgMusic.muted) bgMusic.volume = 0.45;
    lastTime = performance.now();
    animId = requestAnimationFrame(loop);
  }
}

// ════════════════════════════════════════════════════════════
//  MAIN LOOP
// ════════════════════════════════════════════════════════════
let lastTime = 0;
function loop(now) {
  if (!state.running || state.paused) return;
  const dt = Math.min(now - lastTime, 50);
  lastTime  = now;
  update(dt);
  draw();
  animId = requestAnimationFrame(loop);
}

// ════════════════════════════════════════════════════════════
//  UPDATE
// ════════════════════════════════════════════════════════════
function update(dt) {
  const { basket, diffCfg } = state;

  // Arrow-key movement (reduced if drag is active)
  if (keys["ArrowLeft"])  basket.x -= basket.speed;
  if (keys["ArrowRight"]) basket.x += basket.speed;
  basket.x = Math.max(basket.w / 2, Math.min(canvas.width - basket.w / 2, basket.x));

  // Shake decay
  if (state.shake > 0) state.shake = Math.max(0, state.shake - dt * 0.12);

  // Basket squish decay (spring back to 0)
  if (basket.squish !== 0) {
    basket.squish *= Math.pow(0.82, dt / 16);
    if (Math.abs(basket.squish) < 0.01) basket.squish = 0;
  }

  refillQueue();

  state.dropTimer += dt;
  const curInterval = Math.max(600, state.dropInterval - (state.level - 1) * 60);
  if (state.dropTimer >= curInterval && state.dropQueue.length > 0) {
    state.dropTimer = 0;
    dropOneCapsule();
  }

  const speed       = diffCfg.dropSpeed * (1 + (state.level - 1) * 0.18) * state.speedMult;
  const capSnapshot = state.capsules.slice();

  for (let i = 0; i < capSnapshot.length; i++) {
    const cap = capSnapshot[i];
    if (!state.capsules.includes(cap)) continue;

    // Spawn pop-in animation: spawnAge goes 0→1 over 200ms
    if (cap.spawnAge < 1) {
      cap.spawnAge = Math.min(1, cap.spawnAge + dt / 200);
    }

    cap.y      += speed * (dt / 16);
    cap.wobble  = (cap.wobble || 0) + 0.05;
    cap.x      += Math.sin(cap.wobble) * 0.4;

    if (
      cap.y + cap.h / 2 >= basket.y &&
      cap.y - cap.h / 2 <= basket.y + basket.h &&
      cap.x + cap.w / 2 >= basket.x - basket.w / 2 &&
      cap.x - cap.w / 2 <= basket.x + basket.w / 2
    ) {
      catchCapsule(cap);
      break;
    }

    if (cap.y - cap.h / 2 > canvas.height + 10) {
      const idx = state.capsules.indexOf(cap);
      if (idx !== -1) state.capsules.splice(idx, 1);
      if (cap.isCorrect && state.lives > 0) {
        loseLife(missedMsg());
        if (state.lives > 0) {
          state.dropQueue.unshift({ text: correctAnswer(), flag: currentFlag() });
        }
        break;
      }
    }
  }

  for (let i = state.particles.length - 1; i >= 0; i--) {
    const p  = state.particles[i];
    p.x     += p.vx;
    p.y     += p.vy;
    p.vy    += 0.15;
    p.life  -= dt * 0.02;
    if (p.life <= 0) state.particles.splice(i, 1);
  }

  if (state.flashMsg) {
    state.flashMsg.life -= dt;
    if (state.flashMsg.life <= 0) state.flashMsg = null;
  }
}

// ════════════════════════════════════════════════════════════
//  CONTINUOUS SINGLE-DROP SYSTEM
// ════════════════════════════════════════════════════════════
function refillQueue() {
  if (state.dropQueue.length > 2) return;

  const { diffCfg } = state;
  const correct      = correctAnswer();
  const flag         = currentFlag();
  const pool         = questionPool();
  const weakMap      = getWeakMap();

  const wrongOnScreen = state.capsules.filter(c => !c.isCorrect).length;
  const wrongNeeded   = Math.max(0, diffCfg.distractors - wrongOnScreen);

  const visibleTexts  = new Set(state.capsules.map(c => c.text));
  const wrongPool     = wrongAnswerPool(correct).filter(t => !visibleTexts.has(t));

  // Shuffle with a slight bias toward player's weak spots (as distractors)
  wrongPool.sort(() => Math.random() - 0.5);
  const wrongChosen = wrongPool.slice(0, wrongNeeded);

  const correctOnScreen = state.capsules.some(c => c.isCorrect);
  const correctInQueue  = state.dropQueue.some(q => q.text === correct);

  const toAdd = wrongChosen.map(text => {
    let f = "🌐";
    if (state.mode === "capitalMode") {
      const entry = pool.find(c => c.capital === text);
      if (entry) f = entry.flag;
    } else {
      const entry = pool.find(c => c.country === text);
      if (entry) f = entry.flag;
    }
    return { text, flag: (state.mode === "flagMode") ? "" : f };
  });

  if (!correctOnScreen && !correctInQueue) {
    const pos = Math.floor(Math.random() * (toAdd.length + 1));
    // In flagMode capsules show country names only, no flag icon above
    toAdd.splice(pos, 0, { text: correct, flag: (state.mode === "flagMode") ? "" : flag });
  }

  state.dropQueue.push(...toAdd);
}

function dropOneCapsule() {
  if (state.dropQueue.length === 0) return;

  const item    = state.dropQueue.shift();
  const text    = item.text;
  const flag    = item.flag || "🌐";
  const correct = correctAnswer();
  const w       = measureCapsule(flag + " " + text);
  const h       = Math.round(scaledFont(40));   // capsule height scales with canvas
  const margin  = Math.max(30, Math.round(canvas.width * 0.08));
  const usableW = canvas.width - margin * 2;

  let x, tries = 0;
  const topCaps = state.capsules.filter(c => c.y < canvas.height * 0.35);
  do {
    x = margin + Math.random() * usableW;
    tries++;
  } while (tries < 40 && topCaps.some(c => Math.abs(c.x - x) < Math.max(c.w, w) * 0.7));

  state.capsules.push({
    text,
    flag,
    isCorrect: text === correct,
    x,
    y:         -h / 2,
    w,
    h,
    color:     CAPSULE_COLORS[Math.floor(Math.random() * CAPSULE_COLORS.length)],
    wobble:    Math.random() * Math.PI * 2,
    spawnAge:  0,   // 0→1 pop-in animation
  });
}

function measureCapsule(text) {
  const fs = scaledFont(13);
  ctx.font = `bold ${fs}px 'Segoe UI', sans-serif`;
  return ctx.measureText(text).width + Math.round(fs * 2.9);
}

// ════════════════════════════════════════════════════════════
//  CATCH / MISS LOGIC
// ════════════════════════════════════════════════════════════
function catchCapsule(cap) {
  const idx = state.capsules.indexOf(cap);
  if (idx !== -1) state.capsules.splice(idx, 1);

  if (cap.isCorrect) {
    const bonus = state.level;
    state.score += 10 * bonus;
    state.correctCount++;

    state.streak++;
    state.speedMult    = Math.min(2.2, 1.0 + state.streak * 0.08);
    state.dropInterval = Math.max(400,
      state.diffCfg.dropInterval - (state.level - 1) * 60 - state.streak * 80
    );

    // Basket bounce-up on correct catch
    state.basket.squish = -0.35;
    SFX.catch();
    vibrate([40, 30, 40]);   // ✅ correct catch

    spawnParticles(cap.x, cap.y, cap.color, 22, true);
    const streakTag = state.streak >= 2 ? ` 🔥x${state.streak}` : "";
    showFlash(`✅ +${10 * bonus}${streakTag}`, "#4ecca3");

    // Speed-up feedback at streak milestones
    if ([3, 6, 10, 15].includes(state.streak)) {
      SFX.speedUp();
      showFlash(`⚡ Speed Up! 🔥x${state.streak}`, "#f7c948");
    }

    // Track correct answer (weak-spot tracking)
    recordAnswer(state.country, true);

    state.capsules = state.capsules.filter(c => !c.isCorrect);

    if (state.correctCount >= state.nextLevel) {
      levelUp();
    } else {
      nextQuestion();
    }
  } else {
    state.streak       = 0;
    state.speedMult    = 1.0;
    state.dropInterval = Math.max(400,
      state.diffCfg.dropInterval - (state.level - 1) * 60
    );

    // Basket squish-down on wrong catch
    state.basket.squish = 0.45;
    SFX.miss();
    vibrate(120);            // ❌ wrong catch

    spawnParticles(cap.x, cap.y, "#ff6b6b", 14, false);
    loseLife(wrongCatchMsg());
  }

  updateHUD();
}

function loseLife(msg) {
  vibrate([80, 50, 180]);   // 💔 lose a life
  state.lives--;
  state.shake        = 18;
  state.streak       = 0;
  state.speedMult    = 1.0;
  state.dropInterval = Math.max(400,
    state.diffCfg.dropInterval - (state.level - 1) * 60
  );

  // Record missed question as wrong answer
  recordAnswer(state.country, false);

  showFlash(msg, "#ff6b6b");
  updateHUD();
  if (state.lives <= 0) setTimeout(endGame, 600);
}

// ════════════════════════════════════════════════════════════
//  LEVEL UP / NEXT QUESTION
// ════════════════════════════════════════════════════════════
function levelUp() {
  state.level++;
  state.correctCount = 0;
  SFX.levelUp();
  showFlash("🎉 Level " + state.level + "!", "#f7c948");
  state.dropInterval = Math.max(400,
    state.diffCfg.dropInterval - (state.level - 1) * 60 - state.streak * 80
  );
  nextQuestion();
}

function nextQuestion() {
  if (state.isMarathon) {
    state.mode = state.mode === "capitalMode" ? "countryMode" : "capitalMode";
    updateModeBadge();
  }

  const pool = questionPool();
  const weakMap = getWeakMap();

  // Weighted pick: countries with higher wrong-rate get higher chance
  let qi = pickQuestion(pool, weakMap);
  let tries2 = 0;
  while (qi === state.questionIdx && pool.length > 1 && tries2++ < 10) {
    qi = pickQuestion(pool, weakMap);
  }

  state.questionIdx = qi;
  state.country     = pool[qi].country;
  state.capital     = pool[qi].capital;
  state.flag        = pool[qi].flag;

  state.dropQueue = [];
  state.capsules  = state.capsules.filter(c => !c.isCorrect);

  updateHUD();
}

function pickQuestion(pool, weakMap) {
  const p = pool || questionPool();
  const w = weakMap || getWeakMap();

  // Build weight array: base 1, +2 per recorded wrong answer
  const weights = p.map(c => {
    const entry = w[c.country];
    return 1 + (entry ? Math.min(entry.wrong, 4) * 2 : 0);
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return p.length - 1;
}

// ════════════════════════════════════════════════════════════
//  END GAME
// ════════════════════════════════════════════════════════════
function fadeOutMusic(duration = 1500) {
  if (bgMusic.paused || bgMusic.muted) return;
  const startVol = bgMusic.volume;
  const steps    = 30;
  const stepTime = duration / steps;
  const dec      = startVol / steps;
  let   step     = 0;
  const iv = setInterval(() => {
    step++;
    bgMusic.volume = Math.max(0, startVol - dec * step);
    if (step >= steps) {
      clearInterval(iv);
      bgMusic.pause();
      bgMusic.currentTime = 0;
      bgMusic.volume      = startVol;
    }
  }, stepTime);
}

function endGame() {
  state.running = false;
  cancelAnimationFrame(animId);
  fadeOutMusic();

  if (state.score > bestScore) {
    bestScore = state.score;
    localStorage.setItem("geodrop_best", bestScore);
  }

  buildSkinSelector();

  finalScoreEl.textContent = state.score;
  bestScoreEl.textContent  = bestScore;
  finalLevelEl.textContent = state.level;
  finalModeEl.textContent  = state.isMarathon
    ? "🔁 Reverse Marathon"
    : state.mode === "capitalMode"
      ? "🧺 Capital Hunt"
      : state.mode === "flagMode"
        ? "🏳️ Flag Mode"
        : "🗺️ Country Hunt";

  const messages = [
    "Keep exploring the globe! 🌍",
    "Geography superstar in training! ⭐",
    "Nice try! Can you do better? 🗺️",
    "The world awaits — try again! 🌐",
  ];
  finalMessageEl.textContent = state.score >= 100
    ? "Amazing! You're a geography legend! 🏆"
    : messages[Math.floor(Math.random() * messages.length)];

  pendingScore = { score: state.score, mode: finalModeEl.textContent, level: state.level };
  document.getElementById("modalScoreDisplay").textContent = `Score: ${state.score}`;
  document.getElementById("playerNameInput").value = "";
  document.getElementById("nameModal").classList.remove("hidden");
}

// ════════════════════════════════════════════════════════════
//  HUD UPDATE
// ════════════════════════════════════════════════════════════
function updateHUD() {
  scoreEl.textContent      = state.score;
  levelEl.textContent      = state.level;
  countryLabel.textContent = basketLabel();

  const hearts = "❤️".repeat(state.lives)
    + "🖤".repeat(Math.max(0, state.maxLives - state.lives));
  livesDisplay.textContent = hearts;

  if (state.streak >= 2) {
    streakDisplay.textContent = `🔥 x${state.streak}`;
    streakDisplay.classList.remove("hidden");
    streakDisplay.style.animation = "none";
    streakDisplay.offsetHeight;
    streakDisplay.style.animation = "";
  } else {
    streakDisplay.classList.add("hidden");
  }

  updateModeBadge();
}

// ════════════════════════════════════════════════════════════
//  PARTICLES
// ════════════════════════════════════════════════════════════
function spawnParticles(x, y, color, count, burst) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const spd   = burst ? 3 + Math.random() * 4 : 1.5 + Math.random() * 2.5;
    state.particles.push({
      x, y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd - (burst ? 2 : 1),
      color,
      size: 4 + Math.random() * 5,
      life: 1,
    });
  }
}

// ════════════════════════════════════════════════════════════
//  FLASH MESSAGE
// ════════════════════════════════════════════════════════════
function showFlash(msg, color) {
  state.flashMsg = { text: msg, color, life: 1400, maxLife: 1400 };
}

// ════════════════════════════════════════════════════════════
//  DRAW
// ════════════════════════════════════════════════════════════
function draw() {
  const W = canvas.width, H = canvas.height;

  let sx = 0, sy = 0;
  if (state.shake > 0) {
    sx = (Math.random() - 0.5) * state.shake;
    sy = (Math.random() - 0.5) * state.shake * 0.5;
  }

  ctx.save();
  ctx.translate(sx, sy);

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#070720");
  grad.addColorStop(1, "#0f1040");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  drawStars(W, H);
  drawGround(W, H);
  drawCapsules();
  drawParticles();
  drawBasket();
  drawFlash(W, H);

  ctx.restore();
}

// ── Stars ──────────────────────────────────────────────────
let starCache = null, starW = 0, starH = 0;
function drawStars(W, H) {
  if (!starCache || starW !== W || starH !== H) {
    starW = W; starH = H; starCache = [];
    for (let i = 0; i < 80; i++) {
      starCache.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.75,
        r: 0.5 + Math.random() * 1.2,
        a: 0.3 + Math.random() * 0.7,
      });
    }
  }
  const t = performance.now() / 1000;
  starCache.forEach(s => {
    ctx.globalAlpha = s.a * (0.7 + 0.3 * Math.sin(t + s.x));
    ctx.fillStyle   = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// ── Ground ─────────────────────────────────────────────────
function drawGround(W, H) {
  const gh     = 10;
  const mKey   = state.isMarathon ? "marathon" : state.mode;
  const mStyle = MODE_STYLE[mKey] || MODE_STYLE.capitalMode;
  const gg     = ctx.createLinearGradient(0, H - gh, 0, H);
  gg.addColorStop(0, `rgba(${mStyle.rgb},.5)`);
  gg.addColorStop(1, `rgba(${mStyle.rgb},.1)`);
  ctx.fillStyle = gg;
  ctx.fillRect(0, H - gh, W, gh);
}

// ── Capsules ───────────────────────────────────────────────
function drawCapsules() {
  state.capsules.forEach(cap => {
    const { x, y, w, h, text, flag, color, spawnAge } = cap;

    // Pop-in: scale from 0→1 during first 200ms of life
    const scale = easeOutBack(spawnAge);
    if (scale <= 0.01) return;   // not visible yet

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.translate(-x, -y);

    const r = h / 2;

    ctx.shadowColor = color;
    ctx.shadowBlur  = 14;

    // Pill
    ctx.beginPath();
    ctx.moveTo(x - w / 2 + r, y - h / 2);
    ctx.lineTo(x + w / 2 - r, y - h / 2);
    ctx.arc(x + w / 2 - r, y, r, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(x - w / 2 + r, y + h / 2);
    ctx.arc(x - w / 2 + r, y, r, Math.PI / 2, -Math.PI / 2);
    ctx.closePath();

    const cg = ctx.createLinearGradient(x, y - h / 2, x, y + h / 2);
    cg.addColorStop(0, lighten(color, 40));
    cg.addColorStop(1, color);
    ctx.fillStyle = cg;
    ctx.fill();

    // Shine
    ctx.shadowBlur = 0;
    ctx.fillStyle  = "rgba(255,255,255,0.18)";
    ctx.beginPath();
    ctx.ellipse(x, y - h * 0.15, w * 0.35, h * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Flag above text
    ctx.shadowColor  = "rgba(0,0,0,0.5)";
    ctx.shadowBlur   = 3;
    const fs = scaledFont(13);
    ctx.font         = `${fs}px 'Segoe UI', sans-serif`;
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle    = "#fff";
    ctx.fillText(flag, x, y - h * 0.15);

    ctx.font      = `bold ${scaledFont(11)}px 'Segoe UI', sans-serif`;
    ctx.fillText(text, x, y + h * 0.23);
    ctx.shadowBlur = 0;

    ctx.restore();
  });
}

// ease-out back curve for pop-in (overshoots slightly then settles)
function easeOutBack(t) {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

// ── Particles ──────────────────────────────────────────────
function drawParticles() {
  state.particles.forEach(p => {
    ctx.globalAlpha = p.life;
    ctx.fillStyle   = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// ── Basket ─────────────────────────────────────────────────
function drawBasket() {
  const bk     = state.basket;
  const { x, y, w, h, squish } = bk;
  const r      = 8;
  const mKey   = state.isMarathon ? "marathon" : state.mode;
  const mStyle = MODE_STYLE[mKey] || MODE_STYLE.capitalMode;

  const skin   = SKINS.find(s => s.id === selectedSkin) || SKINS[0];
  const skinRgb = skin.rgb || mStyle.rgb;
  const skinHex = skin.hex || mStyle.hex;

  // Apply squish transform: squish > 0 = squash down, < 0 = stretch up (bounce)
  const scaleX = 1 + Math.abs(squish) * 0.15;
  const scaleY = 1 - squish * 0.3;

  ctx.save();
  ctx.translate(x, y + h / 2);         // pivot at basket centre-bottom
  ctx.scale(scaleX, scaleY);
  ctx.translate(-x, -(y + h / 2));

  ctx.shadowColor = skinHex;
  ctx.shadowBlur  = 22;

  const bg = ctx.createLinearGradient(x - w / 2, y, x + w / 2, y + h);
  bg.addColorStop(0, `rgba(${skinRgb},0.45)`);
  bg.addColorStop(1, `rgba(${skinRgb},0.18)`);

  ctx.beginPath();
  ctx.moveTo(x - w / 2 + r, y);
  ctx.lineTo(x + w / 2 - r, y);
  ctx.quadraticCurveTo(x + w / 2, y, x + w / 2, y + r);
  ctx.lineTo(x + w / 2, y + h - r);
  ctx.quadraticCurveTo(x + w / 2, y + h, x + w / 2 - r, y + h);
  ctx.lineTo(x - w / 2 + r, y + h);
  ctx.quadraticCurveTo(x - w / 2, y + h, x - w / 2, y + h - r);
  ctx.lineTo(x - w / 2, y + r);
  ctx.quadraticCurveTo(x - w / 2, y, x - w / 2 + r, y);
  ctx.closePath();

  ctx.fillStyle   = bg;
  ctx.fill();
  ctx.strokeStyle = skinHex;
  ctx.lineWidth   = 2.5;
  ctx.stroke();

  ctx.shadowBlur  = 0;
  ctx.strokeStyle = `rgba(${skinRgb},0.25)`;
  ctx.lineWidth   = 1;
  for (let lx = x - w / 2 + 18; lx < x + w / 2 - 10; lx += 18) {
    ctx.beginPath();
    ctx.moveTo(lx, y + 4);
    ctx.lineTo(lx, y + h - 4);
    ctx.stroke();
  }

  if (skin.id !== "classic") {
    ctx.font         = `${scaledFont(14)}px 'Segoe UI', sans-serif`;
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(skin.icon, x - w / 2 + scaledFont(14), y + h / 2);
  }

  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor  = "rgba(0,0,0,0.6)";
  ctx.shadowBlur   = 4;
  if (state.mode === "flagMode") {
    // Draw real flag image centred in basket; fall back to emoji while loading
    const pool   = questionPool();
    const entry  = pool[state.questionIdx] || COUNTRIES[0];
    const fImg   = entry.code ? getFlagImg(entry.code) : null;
    const cx     = x + (skin.id !== "classic" ? 7 : 0);
    const cy     = y + h / 2;
    if (fImg) {
      // Fill as much of the basket as possible, maintain aspect ratio
      const pad = 5;
      const maxW = w - pad * 2 - (skin.id !== "classic" ? 22 : 0);
      const maxH = h - pad * 2;
      // Fit flag within maxW × maxH maintaining natural aspect
      const imgAspect = fImg.naturalWidth / fImg.naturalHeight;
      let fw, fh;
      if (maxW / maxH > imgAspect) {
        fh = maxH; fw = Math.round(fh * imgAspect);
      } else {
        fw = maxW; fh = Math.round(fw / imgAspect);
      }
      const rx = cx - fw / 2, ry = cy - fh / 2;
      // White border behind flag for clean look
      ctx.save();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.roundRect(rx - 2, ry - 2, fw + 4, fh + 4, 5);
      ctx.fill();
      // Clip and draw flag
      ctx.beginPath();
      ctx.roundRect(rx, ry, fw, fh, 4);
      ctx.clip();
      ctx.drawImage(fImg, rx, ry, fw, fh);
      ctx.restore();
    } else {
      // Image not yet loaded — show emoji fallback
      ctx.font      = `${scaledFont(26)}px 'Segoe UI', sans-serif`;
      ctx.fillStyle = "#fff";
      ctx.fillText(state.flag, cx, cy + 1);
    }
  } else {
    const label = truncateLabel(basketLabel(), w - (skin.id !== "classic" ? 28 : 14));
    ctx.fillStyle = "#fff";
    ctx.font      = `bold ${scaledFont(12)}px 'Segoe UI', sans-serif`;
    ctx.fillText(label, x + (skin.id !== "classic" ? 7 : 0), y + h / 2);
  }
  ctx.shadowBlur   = 0;

  ctx.restore();
}

function truncateLabel(text, maxWidth) {
  ctx.font = `bold ${scaledFont(12)}px 'Segoe UI', sans-serif`;
  if (ctx.measureText(text).width <= maxWidth) return text;
  let t = text;
  while (t.length > 4 && ctx.measureText(t + "…").width > maxWidth) t = t.slice(0, -1);
  return t + "…";
}

// ── Flash message ──────────────────────────────────────────
function drawFlash(W, H) {
  if (!state.flashMsg) return;
  const { text, color, life, maxLife } = state.flashMsg;
  const progress = life / maxLife;
  const alpha    = progress < 0.3 ? progress / 0.3 : 1;

  ctx.globalAlpha  = alpha;
  ctx.font         = `bold ${scaledFont(22)}px 'Segoe UI', sans-serif`;
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor  = color;
  ctx.shadowBlur   = 20;
  ctx.fillStyle    = color;
  ctx.fillText(text, W / 2, H * 0.35 - (1 - progress) * 30);
  ctx.shadowBlur   = 0;
  ctx.globalAlpha  = 1;
}

// ════════════════════════════════════════════════════════════
//  HELPERS
// ════════════════════════════════════════════════════════════
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function lighten(hex, amount) {
  const num = parseInt(hex.replace("#",""), 16);
  const r   = Math.min(255, (num >> 16) + amount);
  const g   = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b   = Math.min(255, (num & 0x0000ff) + amount);
  return `rgb(${r},${g},${b})`;
}

// ── Init ─────────────────────────────────────────────────────
buildSkinSelector();
buildLeaderboardDisplay();
prewarmFlags();   // start loading flag images in background
