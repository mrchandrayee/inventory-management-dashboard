const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const regionData=[["Texas","8 orders · 22%","$5,574",100],["Vermont","4 orders · 20%","$5,088",91],["Oregon","4 orders · 12%","$2,988",55],["North Carolina","15 orders · 11%","$2,812",51],["Georgia","2 orders · 10%","$2,649",47]];
function renderRegions(){ $("#regions").innerHTML=regionData.map((r,i)=>`<div class="region"><span class="rank">${i+1}</span><div class="region-info"><b>${r[0]}</b><small>${r[1]}</small><div class="bar"><span style="width:${r[3]}%"></span></div></div><strong>${r[2]}</strong></div>`).join("");}renderRegions();
const pages={
 overview:["YOUR BUSINESS AT A GLANCE","Welcome back, Imani","Here’s what’s happening with your store today.","Revenue by channel"],
 sales:["SALES PERFORMANCE","Sales","Track revenue, orders and channel performance.","Revenue by channel"],
 stock:["INVENTORY OVERVIEW","Stock health","Keep an eye on product availability and replenishment.","Stock movement"],
 catalog:["YOUR PRODUCTS","Product catalog","Manage your products, prices and availability.","Top products"],
 orders:["ORDER MANAGEMENT","Orders","Review and manage your customer orders.","Orders over time"],
 suppliers:["YOUR PARTNERS","Suppliers","Stay on top of your supplier relationships.","Supplier performance"],
 customers:["YOUR COMMUNITY","Customers","Understand the people shopping with you.","Customer growth"],
 settings:["PREFERENCES","Settings","Manage your workspace preferences.","Activity"]
};
function setPage(page){let p=pages[page]||pages.overview;$("#eyebrow").textContent=p[0];$("#pageTitle").textContent=p[1];$("#pageSub").textContent=p[2];$("#chartTitle").textContent=p[3];$$("[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));if(page==="catalog"){showCatalog()}else{$("#catalogView")?.remove();$(".stats-grid").style.display="grid";$(".content-grid").style.display="grid";$(".bottom-grid").style.display="grid";}if(page==="stock")toast("Stock health view selected");}
function showCatalog(){ $(".stats-grid").style.display="none";$(".content-grid").style.display="none";$(".bottom-grid").style.display="none";if($("#catalogView"))return;let v=document.createElement("section");v.id="catalogView";v.className="catalog-grid";let items=[["Organic oat milk","Dairy alternatives","🥛","$6.50","In stock"],["Golden honey","Pantry","🍯","$12.00","In stock"],["Wildflower tea","Drinks","🍋","$8.75","Low stock"],["Cold brew coffee","Drinks","🧋","$5.25","In stock"],["Farm fresh eggs","Produce","🥚","$7.00","In stock"],["Sourdough loaf","Bakery","🍞","$9.50","Low stock"],["Olive oil","Pantry","🫒","$18.00","In stock"],["Seasonal greens","Produce","🥬","$4.25","In stock"]];v.innerHTML=items.map(x=>`<article class="product"><div class="product-art">${x[2]}</div><h3>${x[0]}</h3><p>${x[1]}</p><div class="product-foot"><span>${x[3]}</span><small>${x[4]}</small></div></article>`).join("");$(".main").insertBefore(v,$(".toast"));}
$$("[data-page]").forEach(b=>b.addEventListener("click",()=>setPage(b.dataset.page)));$$("[data-goto]").forEach(b=>b.addEventListener("click",()=>setPage(b.dataset.goto)));
let toastTimer;function toast(msg){let t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2400)}
function toggleTheme(origin){const dark=document.body.classList.toggle("dark");$("#themeBtn").textContent=dark?"☀":"◐";$("#sideTheme").textContent=dark?"☾":"☼";toast(dark?"Dark appearance enabled":"Light appearance enabled");}
$("#themeBtn").addEventListener("click",()=>toggleTheme($("#themeBtn")));$("#sideTheme").addEventListener("click",()=>toggleTheme($("#sideTheme")));
const modal=$("#modal");$("#newBtn").addEventListener("click",()=>modal.classList.add("open"));$("#closeModal").addEventListener("click",()=>modal.classList.remove("open"));modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open")});
$("#newForm").addEventListener("submit",e=>{e.preventDefault();modal.classList.remove("open");e.target.reset();toast("New inventory item saved (demo)");});
$("#exportBtn").addEventListener("click",()=>{let csv="State,Orders,Revenue\n"+regionData.map(r=>`${r[0]},${r[1].split(" ")[0]},${r[2]}`).join("\n");let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="vessa-sales-report.csv";a.click();URL.revokeObjectURL(a.href);toast("Sales report exported");});
$("#globalSearch").addEventListener("input",e=>{let q=e.target.value.toLowerCase();if(q.includes("sales"))setPage("sales");else if(q.includes("stock"))setPage("stock");else if(q.includes("product"))setPage("catalog");});
document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#globalSearch").focus()}if(e.key==="Escape")modal.classList.remove("open")});
$("#newBtn").title="Add an inventory item";
