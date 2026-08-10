const textForm = document.getElementById("textForm");
const textTitle = document.getElementById("textTitle");
const editorContent = document.getElementById("editorContent");
const fontSizeSelect = document.getElementById("fontSizeSelect");
const statusMessage = document.getElementById("statusMessage");
const jsonPreview = document.getElementById("jsonPreview");
const downloadJsonBtn = document.getElementById("downloadJsonBtn");

// Cargar catálogo inicial desde LocalStorage
let textsCatalog = JSON.parse(localStorage.getItem("taktaim_texts_json")) || [
  {
    id: 1,
    title: "Sample Reading - Software Engineering",
    content:
      "Learning <b>software development</b> requires consistent daily practice. Highlights include: <ul><li>Vocabulary acquisition</li><li>Pronunciation practice</li></ul>",
    createdAt: "2026-08-05",
  },
  {
    id: 1786206032337,
    title: "Big Ships on the Ocean",
    content:
      '<p data-path-to-node="0"><span style="font-size: 1rem;">Large ships travel across the ocean every day. They carry heavy cargo like cars, clothes, and food to different countries. Captains and sailors work on these big boats, and they navigate through calm and rough waters using modern instruments.</span></p><p data-path-to-node="0"><br></p><p data-path-to-node="1">Many people also travel on cruise ships for fun vacations. These luxury ships have restaurants, swimming pools, and comfortable rooms for the passengers. They visit beautiful coastal cities and bring tourists to exciting new places.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786207187512,
    title: "Healthy Food Every Day",
    content:
      '<p data-path-to-node="1" title="" style="cursor: default;">People around the world eat different kinds of food every day. Fruits like apples, bananas, and oranges give us vitamins and energy. Vegetables, rice, and bread are also important parts of a healthy meal because they help our bodies grow strong.</p><p data-path-to-node="1" title="" style="cursor: default;"><br></p><p data-path-to-node="2" style="cursor: default;" title="">Many families cook delicious meals at home together. They buy fresh ingredients at the local market or supermarket. Farmers work hard to grow these vegetables and raise animals so everyone can enjoy good food.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208274576,
    title: "Cars in Our Lives",
    content:
      '<p data-path-to-node="1">Cars are very popular vehicles around the world. People drive them every day to go to work, school, and the supermarket. They usually have four wheels, comfortable seats, and a strong engine. Some cars use gasoline, but many new cars use electricity to protect the environment.</p><p data-path-to-node="1"><br></p><p data-path-to-node="2">Families also take their cars for long road trips on the weekends. Mechanics fix these vehicles in garages when they have a problem. It is very important that all drivers follow the traffic rules and wear a seatbelt to stay safe on the roads.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208318083,
    title: "Travel and Tourism",
    content:
      '<p data-path-to-node="1">Tourism is an important activity for many people around the world. Every year, millions of tourists visit famous cities, sunny beaches, and quiet mountains. They travel by plane, train, or car to discover new places and enjoy different cultures.</p><p data-path-to-node="1"><span style="font-size: 1rem;"><br></span></p><p data-path-to-node="1"><span style="font-size: 1rem;">Tourists usually stay in comfortable hotels and try delicious local food in traditional restaurants. They also take photos of historical monuments and buy colorful souvenirs for their families. Travel opens our minds and creates wonderful memories.</span></p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208346267,
    title: "The Animal Kingdom",
    content:
      '<p data-path-to-node="1">Animals live in many different places all over the planet. Some animals, like dogs and cats, live in our houses as friendly pets. Others, like lions, elephants, and monkeys, live wild in forests, jungles, and grasslands where they hunt or search for food.</p><p data-path-to-node="1"><br></p><p data-path-to-node="2">Every animal has a special role in nature. Birds fly high in the sky to find seeds, while fish swim in the blue ocean. Zoos and national parks help protect these amazing creatures so people can see them and learn about their lives.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208397335,
    title: "The Life of Forests",
    content:
      '<p data-path-to-node="1">Forests cover a large part of our planet Earth. Many tall trees, green plants, and colorful flowers grow together in these quiet places. Trees produce clean oxygen for us to breathe and keep the air fresh and clean for everyone.</p><p data-path-to-node="1"><br></p><p data-path-to-node="2">Forests are also the perfect home for thousands of wild animals. Birds build their nests in the branches, while bears, squirrels, and rabbits live on the forest floor. Protecting these natural places helps our planet stay healthy and green.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208433896,
    title: "Our Daily Routine",
    content:
      '<p data-path-to-node="1">Many people follow a routine every day of the week. They wake up early in the morning, brush their teeth, and eat a healthy breakfast. After breakfast, adults go to work and children travel to school to start their daily activities.</p><p data-path-to-node="1"><br></p><p data-path-to-node="2">In the evening, families return home and spend time together. They cook a delicious dinner, talk about their day, and watch television or read books. Before going to bed, people relax so they can feel rested and ready for a new day.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208460422,
    title: "Eating Out at Restaurants",
    content:
      '<p data-path-to-node="1">Restaurants are popular places where people go to enjoy delicious meals. Customers sit at comfortable tables, look at the menu, and order their favorite dishes. Friendly waiters bring the food and drinks to the table, so people can relax and enjoy their time.</p><p data-path-to-node="1"><br></p><p data-path-to-node="2">Chefs work hard in the kitchen to prepare every recipe with fresh ingredients. Families and friends often celebrate birthdays and special moments at these places. Eating at a restaurant is a fun way to try new flavors and share good conversations.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208492223,
    title: "A Busy Bus Station",
    content:
      '<p data-path-to-node="1">Bus stations are very active places in every city. Hundreds of passengers arrive every hour to catch a bus or welcome their family members. Large buses enter and leave the platforms continuously, taking people to nearby towns or distant cities.</p><p data-path-to-node="1"><br></p><p data-path-to-node="2">Inside the station, travelers buy their tickets at the counters and check the schedule screens. Many people wait in the waiting area, read a book, or buy snacks at small shops before their trip. Drivers ensure that the vehicles are ready for a safe journey on the road.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208510559,
    title: "Life in Big Cities",
    content:
      '<p data-path-to-node="1">Big cities are vibrant places full of movement and energy. Tall skyscrapers rise into the sky, and thousands of people walk through the busy streets every day. Public transport, like buses and subways, carries workers, students, and tourists to different neighborhoods quickly.</p><p data-path-to-node="1"><br></p><p data-path-to-node="2">These large urban areas offer many exciting activities for everyone. People visit famous museums, shop in large centers, and eat at diverse restaurants. Although big cities are often noisy and crowded, they offer incredible opportunities and modern life for millions of residents.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208536959,
    title: "The World of Aviation",
    content:
      '<p data-path-to-node="1">Aviation connects people and countries all around the world every day. Large commercial airplanes fly high above the clouds, carrying hundreds of passengers and heavy cargo across long distances. Modern aircraft use advanced technology, and skilled pilots control the flight safely from the cockpit.</p><p data-path-to-node="1"><br></p><p data-path-to-node="2">Airports are very busy hubs where thousands of travelers start their journeys. Air traffic controllers monitor the skies constantly to direct every takeoff and landing. Aviation makes global travel fast, safe, and exciting for everyone.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208559518,
    title: "The Importance of Education",
    content:
      '<p data-path-to-node="1">Education helps people learn new skills and understand the world around them. Children and young adults go to schools, colleges, and universities every day to study different subjects like mathematics, science, and history. Teachers work hard in the classrooms to explain difficult ideas and help students grow.</p><p data-path-to-node="1"><br></p><p data-path-to-node="2">Education opens many doors for a bright future. It gives people the knowledge they need to get good jobs and solve everyday problems. When people learn together, they build stronger communities and create a better world for everyone.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208612917,
    title: "The Role of Artificial Intelligence",
    content:
      '<p data-path-to-node="1">Artificial Intelligence, or AI, is a modern technology that helps machines think and learn like humans. Everyday devices, like computers and smartphones, use AI to answer questions, recognize voice commands, and translate languages instantly. Many people use these smart tools at home and work to save time and solve complex tasks.</p><p data-path-to-node="1"><br></p><p data-path-to-node="2">AI also plays an important role in many big industries today. Doctors use intelligent software to analyze medical tests, while companies use it to organize information and make better decisions. As technology continues to advance, AI creates new opportunities and changes the way we live and work.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208674925,
    title: "The Power of Sports",
    content:
      '<p data-path-to-node="1">Sports play a very important role in a healthy life. Millions of people around the world play games like soccer, basketball, tennis, and volleyball every day. Playing sports keeps our bodies strong, improves our energy, and helps us reduce daily stress.</p><p data-path-to-node="1"><br></p><p data-path-to-node="2">Many people also enjoy watching professional matches on television or going to stadium events. Athletes practice hard for hours to improve their skills and win competitions for their teams. Sports bring different cultures together and teach us important values like teamwork, discipline, and respect.</p>',
    createdAt: "2026-08-08",
  },
  {
    id: 1786208718484,
    title: "The Four Seasons of the Year",
    content:
      '<p data-path-to-node="1">The Earth changes throughout the year because of the four main seasons. Spring brings warm weather, green leaves, and colorful flowers, while summer brings sunny days that are perfect for swimming and outdoor activities. During autumn, the leaves turn yellow and orange and fall from the trees as the weather cools down.</p><p data-path-to-node="1"><br></p><p data-path-to-node="2">Winter is the coldest season of the year, and in many places, snow covers the ground. People wear warm coats, gloves, and hats to stay comfortable during these cold months. Each season brings different weather, unique traditions, and fun activities for everyone to enjoy.</p>',
    createdAt: "2026-08-08",
  },
];

updateJsonPreview();

// 1. EVENTOS PARA BOTONES DE FORMATO (execCommand)
document.querySelectorAll(".tool-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const command = button.getAttribute("data-cmd");
    document.execCommand(command, false, null);
    editorContent.focus(); // Mantener el foco dentro del editor
  });
});

// 2. EVENTO PARA TAMAÑO DE LETRA
fontSizeSelect.addEventListener("change", (e) => {
  const sizeValue = e.target.value;
  document.execCommand("fontSize", false, sizeValue);
  editorContent.focus();
});

// 3. GUARDAR EL TEXTO EN LOCALSTORAGE CON SUBMIT
textForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const rawHtmlContent = editorContent.innerHTML.trim();

  if (!rawHtmlContent || rawHtmlContent === "<br>") {
    showStatus("⚠️ El contenido del texto no puede estar vacío.", "error");
    return;
  }

  const newEntry = {
    id: Date.now(),
    title: textTitle.value.trim(),
    content: rawHtmlContent, // Se guarda el contenido con formato HTML
    createdAt: new Date().toISOString().split("T")[0],
  };

  // Guardar en el arreglo y sobreescribir LocalStorage
  textsCatalog.push(newEntry);
  localStorage.setItem(
    "taktaim_texts_json",
    JSON.stringify(textsCatalog, null, 2),
  );

  showStatus("✅ Texto con formato enriquecido guardado con éxito.", "success");
  updateJsonPreview();

  // Limpiar campos
  textTitle.value = "";
  editorContent.innerHTML = "";
});

function showStatus(msg, type) {
  statusMessage.textContent = msg;
  statusMessage.className = `status-message ${type}`;
  setTimeout(() => {
    statusMessage.style.display = "none";
  }, 4000);
}

function updateJsonPreview() {
  jsonPreview.textContent = JSON.stringify(textsCatalog, null, 2);
}

// Descargar texts.json físicamente
downloadJsonBtn.addEventListener("click", () => {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(textsCatalog, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "texts.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
});
