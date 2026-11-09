// Juba catalog. Images live in images/p/<id>.webp (pulled from the brand's Facebook page).
const PRICES = { hoodie: 650, sweat: 650, tee: 400, kids: 300 };

const CATEGORIES = [
  { id: 'all', label: 'الكل' },
  { id: 'hoodie', label: 'هوديز' },
  { id: 'sweat', label: 'سويت شيرت' },
  { id: 'tee', label: 'تيشيرتات' },
  { id: 'kids', label: 'أطفال' },
];

const SIZES = {
  hoodie: ['M', 'L', 'XL', '2XL', '3XL'],
  sweat: ['M', 'L', 'XL', '2XL', '3XL'],
  tee: ['M', 'L', 'XL', '2XL', '3XL'],
  kids: ['2-4 سنين', '4-6 سنين', '6-8 سنين', '8-10 سنين', '10-12 سنة'],
};

const PRODUCTS = [
  // Hoodies
  { id: 'h1', cat: 'hoodie', name: 'هودي لا نامت أعين الجبناء', colors: ['أسود', 'نبيتي', 'أبيض'], imgs: ['003', '106', '022', '101', '029', '112'], tag: 'الأكثر طلبا' },
  { id: 'h2', cat: 'hoodie', name: 'هودي خالد بن الوليد NINE', colors: ['أبيض'], imgs: ['125', '006'] },
  { id: 'h3', cat: 'hoodie', name: 'هودي صلاح الدين الأيوبي', colors: ['أسود'], imgs: ['002'] },
  { id: 'h4', cat: 'hoodie', name: 'هودي حفيدة خديجة', colors: ['أسود'], imgs: ['124', '004'], tag: 'للبنات' },
  { id: 'h5', cat: 'hoodie', name: 'هودي أبو دجانة', colors: ['أبيض'], imgs: ['008', '122'] },
  { id: 'h6', cat: 'hoodie', name: 'هودي حمزة أسد الله', colors: ['أسود'], imgs: ['016'] },
  { id: 'h7', cat: 'hoodie', name: 'هودي الفاروق عمر', colors: ['أبيض'], imgs: ['023'] },
  { id: 'h8', cat: 'hoodie', name: 'هودي القعقاع وعمرو وخالد', colors: ['أسود'], imgs: ['026'] },
  { id: 'h9', cat: 'hoodie', name: 'هودي علي بن أبي طالب', colors: ['أبيض'], imgs: ['123', '038'] },
  { id: 'h10', cat: 'hoodie', name: 'هودي خالد بن الوليد الفارس', colors: ['أبيض', 'زيتي', 'نبيتي'], imgs: ['039', '104', '109'] },
  { id: 'h11', cat: 'hoodie', name: 'هودي سيف الله المسلول', colors: ['رمادي', 'أسود'], imgs: ['102', '103'] },
  { id: 'h12', cat: 'hoodie', name: 'هودي ويبقى ديني عز', colors: ['أبيض'], imgs: ['015'] },
  { id: 'h13', cat: 'hoodie', name: 'هودي فارس الإسلام', colors: ['أبيض', 'بني'], imgs: ['005', '110', '111'] },
  { id: 'h14', cat: 'hoodie', name: 'هودي جوبا سادة', colors: ['نبيتي', 'بني', 'تركواز', 'زيتي', 'رمادي', 'أسود', 'أبيض'], imgs: ['113', '114', '115', '116', '117', '017', '019'] },

  // Sweatshirts
  { id: 's1', cat: 'sweat', name: 'سويت شيرت خالد بن الوليد', colors: ['أبيض'], imgs: ['014'] },
  { id: 's2', cat: 'sweat', name: 'سويت شيرت أسياد المعارك', colors: ['نبيتي', 'كحلي'], imgs: ['013', '021'] },

  // Tees
  { id: 't1', cat: 'tee', name: 'تيشيرت فرسان الصحابة', colors: ['أبيض', 'نبيتي', 'أسود'], imgs: ['059', '058', '060', '057'], tag: 'جديد' },
  { id: 't2', cat: 'tee', name: 'تيشيرت عمرو بن العاص عظيم مصر', colors: ['أسود'], imgs: ['012'] },
  { id: 't3', cat: 'tee', name: 'تيشيرت خالد بن الوليد', colors: ['أبيض'], imgs: ['064', '072', '063'] },
  { id: 't4', cat: 'tee', name: 'تيشيرت لا نامت أعين الجبناء', colors: ['أسود'], imgs: ['065'] },
  { id: 't5', cat: 'tee', name: 'تيشيرت KHALID IBN AL-WALID', colors: ['أسود'], imgs: ['066'] },
  { id: 't6', cat: 'tee', name: 'تيشيرت القعقاع وعمرو وخالد', colors: ['أبيض'], imgs: ['069', '071'] },
  { id: 't7', cat: 'tee', name: 'تيشيرت أسياد المعارك', colors: ['أبيض'], imgs: ['070'] },
  { id: 't8', cat: 'tee', name: 'تيشيرت بنو أمية أصلهم دهب', colors: ['أبيض'], imgs: ['074'] },
  { id: 't9', cat: 'tee', name: 'تيشيرت 1K Warriors ابن العاص', colors: ['أبيض'], imgs: ['048', '075'] },
  { id: 't10', cat: 'tee', name: 'تيشيرت أبو دجانة', colors: ['أبيض'], imgs: ['079', '080'] },
  { id: 't11', cat: 'tee', name: 'تيشيرت أرحنا بها يا بلال', colors: ['أبيض', 'نبيتي', 'أسود'], imgs: ['083', '081', '082'] },
  { id: 't12', cat: 'tee', name: 'تيشيرت نحن لا نستسلم', colors: ['أبيض', 'نبيتي', 'أسود'], imgs: ['087', '084', '085', '086'] },
  { id: 't13', cat: 'tee', name: 'تيشيرت علي بن أبي طالب', colors: ['أبيض'], imgs: ['089', '090'] },
  { id: 't14', cat: 'tee', name: 'تيشيرت القدس', colors: ['أسود', 'أبيض'], imgs: ['091', '094', '093', '092'] },
  { id: 't15', cat: 'tee', name: 'تيشيرت لا سيف يفعل بي', colors: ['أبيض'], imgs: ['043'] },
  { id: 't16', cat: 'tee', name: 'تيشيرت الفارس الملثم', colors: ['أبيض'], imgs: ['037'] },
  { id: 't17', cat: 'tee', name: 'تيشيرت حمزة أسد الله', colors: ['أسود'], imgs: ['061'] },
  { id: 't18', cat: 'tee', name: 'تيشيرت مصر The Past Never Dies', colors: ['أبيض', 'أسود'], imgs: ['056', '053', '055', '054'] },
  { id: 't19', cat: 'tee', name: 'تيشيرت بصورتك', colors: ['أبيض'], imgs: ['041', '040'], tag: 'تصميم خاص' },

  // Kids
  { id: 'k1', cat: 'kids', name: 'تيشيرت حمزة للأطفال', colors: ['نبيتي', 'أسود'], imgs: ['034', '035'] },
  { id: 'k2', cat: 'kids', name: 'تيشيرت خالد بن الوليد للأطفال', colors: ['أبيض'], imgs: ['049'] },
  { id: 'k3', cat: 'kids', name: 'هودي الفاروق للأطفال', colors: ['موف'], imgs: ['097', '099', '098'] },
  { id: 'k4', cat: 'kids', name: 'هودي علي بن أبي طالب للأطفال', colors: ['نبيتي'], imgs: ['095', '096'] },
  { id: 'k5', cat: 'kids', name: 'تيشيرت الفاتح للأطفال', colors: ['أسود'], imgs: ['050', '051', '067'] },
  { id: 'k6', cat: 'kids', name: 'تيشيرت الفاروق للأطفال', colors: ['أسود'], imgs: ['121'] },
  { id: 'k7', cat: 'kids', name: 'تيشيرت حمزة أبيض للأطفال', colors: ['أبيض'], imgs: ['062'] },
];

PRODUCTS.forEach(p => { p.price = PRICES[p.cat]; });
