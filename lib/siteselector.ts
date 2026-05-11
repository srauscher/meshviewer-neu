import { _ } from "./utils/language.js";

export const Siteselector = function(){
  const self = {
    render: undefined
  };


  self.render = function render(el: HTMLSelectElement){
    let config = window.config;
    let select = document.createElement("select");
    select.id = "siteChange";
    select.classList.add("site-change");

    let domainNames = config.domainNames;

    if (domainNames.length > 1) {
      if (typeof config.allCommunities !== "undefined") {
        let allNodesOpts = document.createElement("option");
        allNodesOpts.innerHTML = config.allCommunities.name;
        allNodesOpts.value = config.allCommunities.url;
        if (window.location.pathname === config.allCommunities.url) {
          allNodesOpts.selected = true;
        }

        select.appendChild(allNodesOpts);
      }

      domainNames.forEach(function(domain) {
        if (typeof domain.url !== "undefined") {
          let opt = document.createElement("option");
          opt.innerHTML = domain.name;
          opt.value = domain.url;
          if (window.location.pathname === domain.url) {
            opt.selected = true;
          }

          select.appendChild(opt);
        }
      });

      let div = document.createElement("div");
      div.id = "siteChanger";
      div.classList.add("sites");
      el.appendChild(div);

      let label = document.createElement("label");
      label.htmlFor = "siteChange";
      div.appendChild(label);

      let yourCommunity = document.createTextNode(_.t('sidebar.yourCommunity'));
      label.appendChild(yourCommunity);

      div.appendChild(select);

      select.onchange = function(){
        let x = document.getElementById("siteChange") as HTMLSelectElement | null;
        (window as Window).location = x.value;
      }

    }


  }

  return self;
};
