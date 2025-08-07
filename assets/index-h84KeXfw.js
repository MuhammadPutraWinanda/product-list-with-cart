(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();let c=[];const u=()=>fetch("/data.json").then(e=>e.json()).then(e=>e),g=(e,n)=>{const r=c.find(t=>t.name===e);r.total+=1,c=c.filter(t=>t.name===e?r:t),n.innerText=r.total},p=e=>`
  <li class="cart-item">
              <div class="cart-description">
                <p class="item-in-cart-name">${e.name}</p>
                <div class="flex gap-2.5 items-center">
                  <span class="item-in-cart-total">${e.total}x</span>
                  <span class="item-in-cart-price">@ $${e.price}</span>
                  <span class="item-in-cart-total-price">$${e.totalPrice()}</span>
                </div>
              </div>
              <button class="btn-cancel">
                <img
                  src="/images/icon-remove-item.svg"
                  alt="remove icon"
                  class="pointer-events-none"
                />
              </button>
            </li>
  `,y=e=>`
    <li class="order-item-container">
              <img
                src=${e.imgThumbnail}
                class="order-total-img w-14 rounded"
              />

              <div class="order-item-description">
                <p class="order-item-name text-base">${e.name}</p>
                <span class="order-item-total text-base me-3">${e.total}x</span>
                <span class="order-item-price">@ $${e.price}</span>
              </div>

              <strong
                class="order-item-total-price text-lg font-bold justify-self-end"
                >$${e.totalPrice()}</strong
              >
            </li>
`,f=e=>`
     <div class="card">
          <div
            class="card-header"
            data-img-thumbnail = ${e.image.thumbnail}
            style="
              background-image: url(${window.innerWidth>=1024?e.image.desktop:e.image.mobile});
            "
          >
            <button class="btn-addToCart group">
              <img
                src="/images/icon-add-to-cart.svg"
                alt="add to cart icon"
                class="pointer-events-none"
              />
              <span class="addtocart">Add to Cart</span>
            </button>

            <div class="btn-addMenu-container invisible">
              <button class="btn-decrement">
                <img
                  src="/images/icon-decrement-quantity.svg"
                  alt="decrement icon"
                  class="pointer-events-none"
                />
              </button>

              <span class="total-item">0</span>

              <button class="btn-increment">
                <img
                  src="/images/icon-increment-quantity.svg"
                  alt="increment icon"
                  class="pointer-events-none"
                />
              </button>
            </div>
          </div>
          <div class="card-description">
            <p class="item-category">${e.category}</p>
            <p class="item-name">${e.name}</p>
            <p class="item-price">$${e.price}</p>
          </div>
        </div>
    `,o=()=>{document.getElementById("totalItem").innerText=c.reduce((n,r)=>n+r.total,0);const e=document.getElementById("cartList");if(e.innerHTML="",c.length>0){c.forEach(r=>e.innerHTML+=p(r));const n=document.querySelector(".total-price");n.innerText=`$${c.reduce((r,t)=>r+t.totalPrice(),0)}`}else document.querySelector(".empty-cart-display").classList.remove("hidden"),document.querySelector(".field-cart-display").classList.add("hidden")},v=()=>{if(c.length>0){const e=document.querySelector(".purchased-orders-list");e.innerHTML="",c.forEach(r=>e.innerHTML+=y(r));const n=document.querySelector(".total-order-price");n.innerText=`$${c.reduce((r,t)=>r+t.totalPrice(),0)}`}},d=async()=>{const e=await u(),n=document.querySelector(".card-container");n.innerHTML="",e.length>0&&e.forEach(r=>n.innerHTML+=f(r))};document.addEventListener("DOMContentLoaded",()=>{d(),document.addEventListener("mouseover",e=>{e.target.classList.contains("btn-cancel")&&e.target.querySelector("img").setAttribute("src","/images/icon-remove-item-hover.svg"),e.target.classList.contains("btn-decrement")&&e.target.querySelector("img").setAttribute("src","/images/icon-decrement-quantity-hover.svg"),e.target.classList.contains("btn-increment")&&e.target.querySelector("img").setAttribute("src","/images/icon-increment-quantity-hover.svg")}),document.addEventListener("mouseout",e=>{e.target.classList.contains("btn-cancel")&&e.target.querySelector("img").setAttribute("src","/images/icon-remove-item.svg"),e.target.classList.contains("btn-decrement")&&e.target.querySelector("img").setAttribute("src","/images/icon-decrement-quantity.svg"),e.target.classList.contains("btn-increment")&&e.target.querySelector("img").setAttribute("src","/images/icon-increment-quantity.svg")}),document.addEventListener("click",e=>{if(e.target.classList.contains("btn-addToCart")){e.target.closest(".card")?.querySelector(".card-header")?.classList.toggle("card-active"),e.target.classList.add("invisible");const n=e.target.closest(".card")?.querySelector(".btn-addMenu-container");n.classList.remove("invisible");const r=e.target.closest(".card")?.querySelector(".card-description"),t=e.target.closest(".card")?.querySelector(".card-header")?.getAttribute("data-img-thumbnail"),a=r.querySelector(".item-name").innerText,s=r.querySelector(".item-price").innerText,i={name:a,imgThumbnail:t,price:Number(s.slice(1,s.length)),total:0,totalPrice:function(){return this.price*this.total}};c.push(i);const m=n.querySelector(".total-item");g(a,m);const l=document.querySelector(".empty-cart-display");l.classList.contains("hidden")||(l.classList.add("hidden"),document.querySelector(".field-cart-display").classList.remove("hidden")),o()}if(e.target.classList.contains("btn-increment")){const n=e.target.closest(".card")?.querySelector(".item-name").innerText;c.forEach(t=>t.name===n?t.total+=1:t.total===t.total);const r=e.target.closest(".btn-addMenu-container")?.querySelector(".total-item");r.innerText=Number(r.innerText)+1,o()}if(e.target.classList.contains("btn-decrement")){const n=e.target.closest(".card")?.querySelector(".item-name").innerText;c.forEach(t=>t.name===n?t.total-=1:t.total===t.total);const r=e.target.closest(".btn-addMenu-container")?.querySelector(".total-item");r.innerText=Number(r.innerText)-1,r.innerText==0&&(c=c.filter(t=>t.name!==n),e.target.closest(".card").querySelector(".btn-addToCart").classList.remove("invisible"),e.target.closest(".btn-addMenu-container")?.classList.add("invisible"),e.target.closest(".card-header").classList.remove("card-active")),o()}if(e.target.classList.contains("btn-cancel")){const n=e.target.closest(".cart-item")?.querySelector(".item-in-cart-name")?.innerText;c=c.filter(t=>t.name!==n),o();const r=document.querySelectorAll(".card");for(const t of r){const a=t.querySelector(".item-name").innerText;n===a&&(t.querySelector(".card-header")?.classList.remove("card-active"),t.querySelector(".btn-addToCart").classList.remove("invisible"),t.querySelector(".btn-addMenu-container").classList.add("invisible"))}}e.target.classList.contains("btn-confirm")&&(innerWidth<1024&&(document.querySelector(".card-container").classList.add("hidden"),document.querySelector(".cart").classList.add("hidden")),document.querySelector(".overlay").classList.remove("hidden"),document.querySelector(".order-confirm-display").classList.remove("hidden"),v()),e.target.classList.contains("btn-new-order")&&(c=[],window.innerWidth<1024&&(document.querySelector(".card-container").classList.remove("hidden"),document.querySelector(".cart").classList.remove("hidden")),document.querySelector(".order-confirm-display").classList.add("hidden"),document.querySelector(".overlay").classList.add("hidden"),d(),o())})});
