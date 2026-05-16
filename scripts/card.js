document.addEventListener("DOMContentLoaded", () => {
  const datasetCardFilters = {
    all: [
      {
        title: "test1",
        subtitle: "test subtitle1",
        image:
          "https://alfabank.servicecdn.ru/site-upload/25/51/1449/D_CardPromo_267_298_vertical_dc.png",
        href: "#",
      },
      {
        title: "test2",
        subtitle: "test subtitle2",
        image:
          "https://alfabank.servicecdn.ru/site-upload/25/51/1449/D_CardPromo_267_298_vertical_dc.png",
        href: "#",
      },
      {
        title: "test3",
        subtitle: "test subtitle3",
        image:
          "https://alfabank.servicecdn.ru/site-upload/25/51/1449/D_CardPromo_267_298_vertical_dc.png",
        href: "#",
      },
      {
        title: "test4",
        subtitle: "test subtitle4",
        image:
          "https://alfabank.servicecdn.ru/site-upload/25/51/1449/D_CardPromo_267_298_vertical_dc.png",
        href: "#",
      },
    ],
    "small-business": [
      {
        title: "1test",
        subtitle: "test subtitle1",
        image:
          "https://alfabank.servicecdn.ru/site-upload/25/51/1449/D_CardPromo_267_298_vertical_dc.png",
        href: "#",
      },
    ],
    "large-business": [
      {
        title: "test large business1",
        subtitle: "test subtitle large business1",
        image:
          "https://alfabank.servicecdn.ru/site-upload/25/51/1449/D_CardPromo_267_298_vertical_dc.png",
        href: "#",
      },
    ],
  };
  let blockWrapperElement = document.querySelector(".segmented-control");
  if (!blockWrapperElement) return; 
  let sliderBackgroundMarker = document.querySelector("[data-card-background]");
  let tabFilterTriggers = document.querySelectorAll("[data-card-category]");
  let nodeDisplayContainer = document.querySelector("[data-cards-container]");

  function calculateMarkerGeometry(activeButtonNode) {
    let parentBoundaryRect = blockWrapperElement.getBoundingClientRect();
    let targetNodeRect = activeButtonNode.getBoundingClientRect();
    sliderBackgroundMarker.style.width = `${targetNodeRect.width}px`;
    sliderBackgroundMarker.style.left = `${targetNodeRect.left - parentBoundaryRect.left - blockWrapperElement.clientLeft}px`;
  }

  tabFilterTriggers.forEach((clickableButton) => {
    clickableButton.addEventListener("click", () => {
      executePopulateCards(clickableButton.dataset.cardCategory);
      for (let alternativeButton of tabFilterTriggers) {
        alternativeButton.classList.remove("active");
      }
      calculateMarkerGeometry(clickableButton);
      clickableButton.classList.add("active");
    });
  });

  function executePopulateCards(selectedTabKey) {
    nodeDisplayContainer.innerHTML = "";
    if (!datasetCardFilters[selectedTabKey]) return;
    datasetCardFilters[selectedTabKey].forEach((cardItemObj) => {
      let createdCardNode = document.createElement("div");
      createdCardNode.classList.add("card");
      createdCardNode.innerHTML = `
        <div class="card_content">
          <p class="card_title">${cardItemObj.title}</p>
          <p class="card_sub">${cardItemObj.subtitle}</p>
        </div>
        `;
      createdCardNode.style.backgroundImage = `url(${cardItemObj.image})`;
      nodeDisplayContainer.appendChild(createdCardNode);
    });
  }

  window.addEventListener('load', () => calculateMarkerGeometry(tabFilterTriggers[0]));
  window.addEventListener('resize', () => {
    const currentActiveNode = Array.from(tabFilterTriggers).find(nodeItem => nodeItem.classList.contains('active'));
    if (currentActiveNode) calculateMarkerGeometry(currentActiveNode);
  });
  
  executePopulateCards("all");
});