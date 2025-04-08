(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const a="http://localhost:8080/",r=document.querySelector("#modal"),g=document.querySelector("#dismiss"),p=document.querySelector("#add"),f=document.querySelector("#notes");let u=!1,h=null;p.addEventListener("click",()=>{r.classList.toggle("hidden")});g.addEventListener("click",()=>{r.classList.toggle("hidden")});const y=async()=>{const e=await(await fetch(`${a}notes`)).json();d(e)},d=async s=>{console.log(s),f.innerHTML="",s.forEach(e=>{const n=new Date(e.date),l=n.getDate(),t=n.toLocaleString("de-DE",{month:"long"}),o=document.createElement("li");o.classList.add("my-2","mb-4","flex","gap-4","rounded-lg","bg-slate-100","p-4","shadow-lg"),o.innerHTML=`
    <div
    class="flex max-h-16 flex-col items-center rounded-lg bg-slate-500 p-2 text-white">
    <span class="text-2xl leading-6">${l}</span>
    <span class="text-sm">${t}</span>
    </div>
    <div>
    <h3 class="text-xs text-slate-700">${e.author}</h3>
    <p class="font-semibold text-gray-800">
    ${e.note}
    </p>
    </div>
    <div class="relative">
    <button class="flyout-btn">...</button>
    <div class="flyout absolute right-6 top-0 hidden">
    <ul class="flex flex-col gap-2 rounded-lg bg-white p-2 shadow-lg">
    <li class="rounded-lg p-2 hover:bg-gray-100">Edit</li>
    <li class="rounded-lg p-2 hover:bg-gray-100">Delete</li>
    </ul>
    </div>
    </div>
    `,f.appendChild(o);const c=o.querySelector(".flyout-btn");c.addEventListener("click",b=>{const i=c.closest(".relative").querySelector(".flyout");i.classList.toggle("hidden"),i.querySelector("li:nth-child(1)").addEventListener("click",()=>{u=!0,h=e.id,document.querySelector("#note").value=e.note,document.querySelector("#author").value=e.author,r.classList.toggle("hidden")}),i.querySelector("li:nth-child(2)").addEventListener("click",()=>{L(e.id)})})})};form.addEventListener("submit",async s=>{s.preventDefault();const e=document.getElementById("note").value,n=document.getElementById("author").value,t={note:e,author:n,date:new Date};u?(v(t,h),u=!1):m(t)});const m=async s=>{const n=await(await fetch(`${a}notes`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).json();d(n),r.classList.toggle("hidden")},v=async(s,e)=>{console.log(s);const l=await(await fetch(`${a}notes/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).json();d(l),r.classList.toggle("hidden")},L=async s=>{try{const n=await(await fetch(`${a}notes/${s}`,{method:"DELETE"})).json();d(n)}catch(e){console.error(e)}};y();
