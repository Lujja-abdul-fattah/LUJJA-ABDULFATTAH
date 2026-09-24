import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Link, NavLink, Routes, Route, useNavigate, useParams} from "react-router-dom";
import {
  CakeSlice, ShoppingBag, Menu as MenuIcon, X, Search, Plus, Minus, Trash2,
  Heart, Star, ArrowRight, Phone, Mail, MapPin, Clock3, Instagram, Facebook,
  MessageCircle, ChevronRight, CheckCircle2, Sparkles, Truck, Store, ShieldCheck,
  Upload, Send, CreditCard, Banknote, Smartphone, ChevronDown
} from "lucide-react";
import "./styles.css";

const CONFIG = {
  name: "HOMEBAKES",
  email: "lujjaabdulfattah@gmail.com",
  phone: "+256 700 000 000",
  whatsapp: "256700000000",
  address: "Kampala, Uganda",
  hours: "Mon–Sat: 8:00 AM – 7:00 PM",
  deliveryFee: 5000,
  currency: "UGX",
  socials: {instagram:"#", facebook:"#", tiktok:"#"}
};

const img = (q, w=900) => `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=${w}&q=82`;

const PRODUCTS = [
  {id:"choc-cake", name:"Chocolate Cake", category:"Cakes", price:45000, sizes:{ "6 inch":45000,"8 inch":65000,"10 inch":85000,"12 inch":110000 }, image:img("1578985545062-69928b1d9587"), desc:"Rich chocolate sponge layered with silky chocolate cream.", ingredients:"Flour, cocoa, eggs, sugar, butter, milk, chocolate.", featured:true},
  {id:"vanilla-cake", name:"Vanilla Cake", category:"Cakes", price:40000, sizes:{ "6 inch":40000,"8 inch":60000,"10 inch":80000,"12 inch":100000 }, image:img("1571115177098-24ec42ed204d"), desc:"Light vanilla sponge with a smooth, creamy finish.", ingredients:"Flour, eggs, sugar, vanilla, butter, milk.", featured:true},
  {id:"red-velvet", name:"Red Velvet Cake", category:"Cakes", price:50000, sizes:{ "6 inch":50000,"8 inch":70000,"10 inch":90000,"12 inch":115000 }, image:img("1614707267537-2f3b7a8f7b0b"), desc:"Velvety cocoa cake with our signature cream cheese frosting.", ingredients:"Flour, cocoa, eggs, sugar, buttermilk, cream cheese.", featured:true},
  {id:"carrot-cake", name:"Carrot Cake", category:"Cakes", price:48000, sizes:{ "6 inch":48000,"8 inch":68000,"10 inch":88000,"12 inch":110000 }, image:img("1621303837174-89787a7d4729"), desc:"Moist spiced carrot cake finished with cream cheese frosting.", ingredients:"Carrots, flour, eggs, cinnamon, nuts, cream cheese."},
  {id:"black-forest", name:"Black Forest Cake", category:"Cakes", price:55000, sizes:{ "6 inch":55000,"8 inch":75000,"10 inch":95000,"12 inch":120000 }, image:img("1578985545062-69928b1d9587"), desc:"Chocolate sponge, cherry filling and clouds of cream.", ingredients:"Chocolate sponge, cherries, cream, sugar, chocolate."},
  {id:"strawberry-cake", name:"Strawberry Cake", category:"Cakes", price:52000, sizes:{ "6 inch":52000,"8 inch":72000,"10 inch":92000,"12 inch":118000 }, image:img("1565958011703-44f9829ba187"), desc:"Fresh strawberry layers with a delicate vanilla cream.", ingredients:"Strawberries, flour, eggs, sugar, cream, vanilla."},
  {id:"birthday-cake", name:"Celebration Cake", category:"Cakes", price:60000, sizes:{ "6 inch":60000,"8 inch":80000,"10 inch":100000,"12 inch":125000 }, image:img("1558636508-e0db3814bd1d"), desc:"A joyful, customisable cake made for your big moments.", ingredients:"Vanilla sponge, buttercream, sprinkles."},
  {id:"choc-cupcake", name:"Chocolate Cupcake", category:"Cupcakes", price:6000, image:img("1587668178277-295251f900ce"), desc:"Moist chocolate cupcake crowned with chocolate frosting.", ingredients:"Flour, cocoa, eggs, sugar, butter, chocolate.", featured:true},
  {id:"vanilla-cupcake", name:"Vanilla Cupcake", category:"Cupcakes", price:5500, image:img("1519869325930-281384150729"), desc:"Soft vanilla cupcake with a creamy swirl.", ingredients:"Flour, eggs, sugar, vanilla, butter, milk."},
  {id:"red-cupcake", name:"Red Velvet Cupcake", category:"Cupcakes", price:6500, image:img("1587668178277-295251f900ce"), desc:"Mini red velvet indulgence with cream cheese frosting.", ingredients:"Flour, cocoa, eggs, buttermilk, cream cheese."},
  {id:"croissant", name:"Butter Croissant", category:"Pastries", price:7000, image:img("1555507036-ab1f4038808a"), desc:"Golden, flaky layers baked fresh every morning.", ingredients:"Flour, butter, milk, yeast, sugar, salt.", featured:true},
  {id:"cinnamon", name:"Cinnamon Roll", category:"Pastries", price:8000, image:img("1509440159596-0249088772ff"), desc:"Soft swirls of cinnamon sugar finished with vanilla glaze.", ingredients:"Flour, cinnamon, butter, sugar, yeast, milk."},
  {id:"donut", name:"Glazed Doughnut", category:"Pastries", price:5000, image:img("1551024506-0bccd828d307"), desc:"Pillowy doughnut with a glossy sweet glaze.", ingredients:"Flour, eggs, milk, yeast, sugar, glaze."},
  {id:"meat-pie", name:"Meat Pie", category:"Pastries", price:7000, image:img("1601050690597-df0568f70950"), desc:"Buttery pastry filled with savoury seasoned beef.", ingredients:"Flour, butter, beef, onion, herbs, spices."},
  {id:"sausage-roll", name:"Sausage Roll", category:"Pastries", price:6500, image:img("1612874742237-6526221588e3"), desc:"Golden puff pastry wrapped around a savoury sausage filling.", ingredients:"Puff pastry, sausage, herbs, egg."},
  {id:"cookies", name:"Chocolate Chip Cookies", category:"Cookies", price:12000, image:img("1499636136210-6f4ee915583e"), desc:"Crisp edges, soft centres and generous chocolate chips.", ingredients:"Flour, butter, sugar, eggs, chocolate chips."},
  {id:"brownies", name:"Fudge Brownies", category:"Brownies", price:18000, image:img("1606313564200-e75d5e30476c"), desc:"Deep, fudgy brownies with a rich chocolate bite.", ingredients:"Chocolate, cocoa, butter, eggs, sugar, flour."},
  {id:"cake-pops", name:"Cake Pops", category:"Cookies", price:20000, image:img("1575377427642-087cf684f7b0"), desc:"Bite-sized cake treats dipped in a sweet coating.", ingredients:"Cake, frosting, chocolate coating."},
  {id:"muffins", name:"Blueberry Muffins", category:"Cookies", price:15000, image:img("1558301211-0d8c8ddee6ec"), desc:"Tender breakfast muffins packed with juicy blueberries.", ingredients:"Flour, blueberries, eggs, milk, butter, sugar."}
];

const testimonials = [
  ["“Absolutely delicious! The cake looked beautiful and tasted even better.”","Sarah"],
  ["“Ordering was so easy and the pastries were fresh and amazing.”","Aisha"],
  ["“HomeBakes has become my go-to bakery for celebrations.”","Daniel"]
];

const gallery = [
  img("1578985545062-69928b1d9587"), img("1587668178277-295251f900ce"),
  img("1555507036-ab1f4038808a"), img("1499636136210-6f4ee915583e"),
  img("1558636508-e0db3814bd1d"), img("1565958011703-44f9829ba187"),
  img("1509440159596-0249088772ff"), img("1606313564200-e75d5e30476c")
];

const money = n => `${CONFIG.currency} ${new Intl.NumberFormat("en-US").format(n)}`;

const CartContext = createContext(null);
function CartProvider({children}) {
  const [cart,setCart] = useState(()=>JSON.parse(localStorage.getItem("homebakes-cart")||"[]"));
  useEffect(()=>localStorage.setItem("homebakes-cart",JSON.stringify(cart)),[cart]);
  const add = (product, quantity=1, size=null, instructions="") => {
    const key = `${product.id}-${size||"standard"}`;
    setCart(c => {
      const found=c.find(i=>i.key===key);
      if(found) return c.map(i=>i.key===key?{...i,quantity:i.quantity+quantity,instructions:instructions||i.instructions}:i);
      return [...c,{key,productId:product.id,name:product.name,price:size?product.sizes[size]:product.price,image:product.image,quantity,size,instructions}];
    });
  };
  const update=(key,quantity)=>setCart(c=>quantity<=0?c.filter(i=>i.key!==key):c.map(i=>i.key===key?{...i,quantity}:i));
  const remove=key=>setCart(c=>c.filter(i=>i.key!==key));
  const clear=()=>setCart([]);
  const subtotal=cart.reduce((s,i)=>s+i.price*i.quantity,0);
  const count=cart.reduce((s,i)=>s+i.quantity,0);
  return <CartContext.Provider value={{cart,add,update,remove,clear,subtotal,count}}>{children}</CartContext.Provider>
}
const useCart=()=>useContext(CartContext);

function Layout(){
  const [open,setOpen]=useState(false);
  const {count}=useCart();
  return <>
    <header className="nav">
      <Link to="/" className="brand" onClick={()=>setOpen(false)}><span className="brand-mark"><CakeSlice size={21}/></span>HOMEBAKES</Link>
      <button className="mobile-menu" aria-label="Open menu" onClick={()=>setOpen(!open)}>{open?<X/>:<MenuIcon/>}</button>
      <nav className={open?"nav-links open":"nav-links"}>
        {[
          ["/","Home"],["/menu","Menu"],["/custom-cakes","Custom Cakes"],["/about","About"],["/contact","Contact"]
        ].map(([to,label])=><NavLink key={to} to={to} end={to==="/"} onClick={()=>setOpen(false)}>{label}</NavLink>)}
      </nav>
      <div className="nav-actions">
        <Link to="/cart" className="cart-button" aria-label={`Cart with ${count} items`}><ShoppingBag size={20}/><span>Cart</span>{count>0&&<b>{count}</b>}</Link>
        <Link to="/menu" className="btn btn-dark nav-order">Order Now</Link>
      </div>
    </header>
  </>
}

function Footer(){
 return <footer className="footer">
  <div className="footer-grid">
   <div><div className="footer-brand">HOMEBAKES</div><p>Freshly baked. Made with love.</p><div className="socials"><a href={CONFIG.socials.instagram} aria-label="Instagram"><Instagram/></a><a href={CONFIG.socials.facebook} aria-label="Facebook"><Facebook/></a><a href="#" aria-label="TikTok">♪</a><a href={`https://wa.me/${CONFIG.whatsapp}`} aria-label="WhatsApp"><MessageCircle/></a></div></div>
   <div><h4>Quick Links</h4><Link to="/">Home</Link><Link to="/menu">Menu</Link><Link to="/about">About</Link><Link to="/custom-cakes">Custom Cakes</Link><Link to="/contact">Contact</Link></div>
   <div><h4>Customer Service</h4><Link to="/contact">Contact Us</Link><Link to="/menu">Order Online</Link><a href="#delivery">Delivery Information</a><a href="#faqs">FAQs</a></div>
   <div><h4>Contact</h4><a href={`mailto:${CONFIG.email}`}><Mail/> {CONFIG.email}</a><a href={`tel:${CONFIG.phone}`}><Phone/> {CONFIG.phone}</a><p><MapPin/> {CONFIG.address}</p><p><Clock3/> {CONFIG.hours}</p></div>
  </div>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} HomeBakes. All rights reserved.</span><span>Fresh • Homemade • Premium</span></div>
 </footer>
}

function Page({children}){ return <><Layout/><main>{children}</main><Footer/></> }

function Home(){
 const featured=PRODUCTS.filter(p=>p.featured).slice(0,6);
 return <Page>
  <section className="hero">
   <div className="hero-copy"><div className="eyebrow"><Sparkles size={16}/> Baked fresh in Kampala</div><h1>Freshly Baked.<br/><em>Made With Love.</em></h1><p>Delicious cakes, pastries and homemade treats baked fresh for every special moment.</p><div className="hero-actions"><Link to="/menu" className="btn btn-gold">Order Now <ArrowRight size={18}/></Link><Link to="/menu" className="btn btn-outline">Explore Menu</Link></div><div className="mini-trust"><span><CheckCircle2/> Freshly Baked</span><span><CheckCircle2/> Quality Ingredients</span><span><CheckCircle2/> Made With Love</span><span><CheckCircle2/> Easy Ordering</span></div></div>
   <div className="hero-image"><img src={img("1578985545062-69928b1d9587",1200)} alt="Beautiful chocolate cake"/></div>
  </section>
  <section className="section favorites"><div className="section-head"><div><span className="eyebrow">A little something sweet</span><h2>Our Favorites</h2></div><Link to="/menu" className="text-link">View full menu <ArrowRight size={17}/></Link></div><div className="product-grid">{featured.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  <section className="offer"><div><span className="eyebrow">This weekend</span><h2>Make the weekend a little sweeter.</h2><p>Get 10% off selected celebration cakes. Perfect for birthdays, surprises and every excuse to gather.</p><Link to="/menu" className="btn btn-light">Shop Specials <ArrowRight size={17}/></Link></div><div className="offer-art"><CakeSlice size={140}/><span>10% OFF</span></div></section>
  <section className="section about-preview"><div className="split-image"><img src={img("1558636508-e0db3814bd1d")} alt="HomeBakes celebration cake"/></div><div className="split-copy"><span className="eyebrow">Baked With Love</span><h2>Every celebration deserves something delicious.</h2><p>At HomeBakes, we believe the best moments are made sweeter with something from the oven. From beautifully decorated cakes to flaky pastries and little treats, we make homemade goodness with quality ingredients and plenty of care.</p><p>Whether it’s a birthday, wedding, graduation, anniversary or simply a treat for yourself, we’re here to make every moment sweeter.</p><Link to="/about" className="btn btn-dark">Learn More <ArrowRight size={17}/></Link></div></section>
  <Why/>
  <Testimonials/>
  <Gallery/>
  <CTA/>
 </Page>
}

function Why(){ return <section className="section why"><div className="section-head centered"><div><span className="eyebrow">The HomeBakes promise</span><h2>Made for your best moments.</h2></div></div><div className="why-grid">{[
 ["Fresh Every Day","Freshly baked treats made with care.",Sparkles],["Quality Ingredients","Carefully selected ingredients in every recipe.",ShieldCheck],["Made With Love","Every order receives personal attention.",Heart],["Easy Ordering","Order online quickly and conveniently.",ShoppingBag]
].map(([t,d,I])=><div className="why-card" key={t}><div className="icon-box"><I/></div><h3>{t}</h3><p>{d}</p></div>)}</div></section>}

function Testimonials(){return <section className="section testimonials"><div className="section-head centered"><div><span className="eyebrow">Kind words</span><h2>Loved by sweet-toothed customers.</h2></div></div><div className="testimonial-grid">{testimonials.map(([q,n])=><div className="testimonial" key={n}><div className="stars">★★★★★</div><p>{q}</p><strong>— {n}</strong></div>)}</div></section>}

function Gallery(){return <section className="section gallery-section"><div className="section-head"><div><span className="eyebrow">From our kitchen</span><h2>A feast for the eyes.</h2></div><Link to="/contact" className="text-link">Visit HomeBakes <ArrowRight size={17}/></Link></div><div className="gallery">{gallery.map((g,i)=><img loading="lazy" src={g} alt={`HomeBakes bakery treat ${i+1}`} key={g}/>)}</div></section>}

function CTA(){return <section className="cta"><div><span className="eyebrow">Your next sweet moment</span><h2>Ready to make it delicious?</h2><p>Choose your favourites or tell us about the cake you’ve been dreaming of.</p></div><div className="cta-actions"><Link to="/menu" className="btn btn-gold">Order Online</Link><Link to="/custom-cakes" className="btn btn-outline-light">Custom Cake</Link></div></section>}

function ProductCard({product}){
 const {add}=useCart(); const [qty,setQty]=useState(1);
 return <article className="product-card"><Link to={`/product/${product.id}`} className="product-img"><img loading="lazy" src={product.image} alt={product.name}/><span className="quick">View <ChevronRight size={14}/></span></Link><div className="product-body"><div className="product-top"><span className="category">{product.category}</span><span className="price">{money(product.price)}</span></div><h3>{product.name}</h3><p>{product.desc}</p><div className="card-actions"><div className="qty"><button onClick={()=>setQty(Math.max(1,qty-1))} aria-label="Decrease"><Minus size={14}/></button><span>{qty}</span><button onClick={()=>setQty(qty+1)} aria-label="Increase"><Plus size={14}/></button></div><button className="btn btn-dark small" onClick={()=>add(product,qty)}>Add to Cart</button></div><button className="order-now" onClick={()=>add(product,qty)}>Order Now <ArrowRight size={14}/></button></div></article>
}

function MenuPage(){
 const [query,setQuery]=useState(""); const [cat,setCat]=useState("All");
 const cats=["All","Cakes","Cupcakes","Pastries","Cookies","Brownies","Special Offers"];
 const products=PRODUCTS.filter(p=>(cat==="All"||cat==="Special Offers"?true:p.category===cat)&&(!query||`${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())));
 return <Page><section className="page-hero"><span className="eyebrow">The menu</span><h1>Good things, baked daily.</h1><p>From celebration cakes to flaky pastries, choose your favourites and order in a few clicks.</p></section><section className="section menu-section"><div className="menu-tools"><label className="search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search cakes, pastries, cupcakes…"/></label><div className="chips">{cats.map(c=><button key={c} className={cat===c?"chip active":"chip"} onClick={()=>setCat(c)}>{c}</button>)}</div></div>{products.length?<div className="product-grid">{products.map(p=><ProductCard product={p} key={p.id}/>)}</div>:<div className="empty"><CakeSlice/><h3>No treats found</h3><p>Try another search or category.</p></div>}</section></Page>
}

function ProductPage(){
 const {id}=useParams();
 return <ProductDetail key={id} id={id}/>;
}
function ProductDetail({id}){
 const product=PRODUCTS.find(p=>p.id===id); const {add}=useCart(); const nav=useNavigate();
 const [size,setSize]=useState(product?.sizes?Object.keys(product.sizes)[0]:null); const [qty,setQty]=useState(1); const [note,setNote]=useState("");
 if(!product)return <Page><div className="empty page-empty"><h2>Product not found</h2><Link to="/menu" className="btn btn-dark">Back to Menu</Link></div></Page>;
 const price=size?product.sizes[size]:product.price;
 const buy=()=>{add(product,qty,size,note);nav("/checkout")};
 return <Page><section className="section product-detail"><div className="detail-image"><img src={product.image} alt={product.name}/></div><div className="detail-copy"><span className="category">{product.category}</span><h1>{product.name}</h1><div className="detail-price">{money(price)}</div><p className="lead">{product.desc}</p><div className="detail-rule"/><div><h4>Ingredients</h4><p>{product.ingredients}</p></div>{product.sizes&&<div className="option-group"><h4>Choose a size</h4><div className="size-options">{Object.keys(product.sizes).map(s=><button key={s} className={size===s?"size active":"size"} onClick={()=>setSize(s)}>{s}<small>{money(product.sizes[s])}</small></button>)}</div></div>}<div className="option-group"><h4>Quantity</h4><div className="qty large"><button onClick={()=>setQty(Math.max(1,qty-1))}><Minus/></button><span>{qty}</span><button onClick={()=>setQty(qty+1)}><Plus/></button></div></div><label className="field"><span>Special instructions</span><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g. Please write Happy Birthday Sarah on the cake." rows="3"/></label><div className="detail-actions"><button className="btn btn-dark" onClick={()=>add(product,qty,size,note)}>Add to Cart</button><button className="btn btn-gold" onClick={buy}>Buy Now <ArrowRight/></button></div></div></section></Page>
}

function CartPage(){
 const {cart,update,remove,subtotal}=useCart(); const delivery=cart.length?CONFIG.deliveryFee:0; const total=subtotal+delivery;
 if(!cart.length)return <Page><section className="empty cart-empty"><div className="empty-icon">🧁</div><h1>Your cart is empty</h1><p>Looks like you haven’t added anything yet.</p><Link to="/menu" className="btn btn-dark">Explore Our Menu</Link></section></Page>;
 return <Page><section className="section cart-page"><div className="page-title"><span className="eyebrow">Your selection</span><h1>Shopping Cart</h1></div><div className="cart-layout"><div className="cart-list"><div className="cart-head"><span>Product</span><span>Quantity</span><span>Price</span><span>Total</span></div>{cart.map(i=><div className="cart-row" key={i.key}><div className="cart-product"><img src={i.image} alt=""/><div><strong>{i.name}</strong>{i.size&&<small>{i.size}</small>}</div></div><div className="qty"><button onClick={()=>update(i.key,i.quantity-1)}><Minus/></button><span>{i.quantity}</span><button onClick={()=>update(i.key,i.quantity+1)}><Plus/></button></div><span>{money(i.price)}</span><strong>{money(i.price*i.quantity)}</strong><button className="remove" onClick={()=>remove(i.key)} aria-label={`Remove ${i.name}`}><Trash2/></button></div>)}</div><aside className="summary"><h3>Order Summary</h3><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery Fee</span><b>{money(delivery)}</b></div><div className="grand"><span>Grand Total</span><b>{money(total)}</b></div><Link to="/checkout" className="btn btn-gold full">Proceed to Checkout <ArrowRight/></Link><p className="secure"><ShieldCheck size={16}/> Secure checkout • No payment is processed yet</p></aside></div></section></Page>
}

function CheckoutPage(){
 const {cart,subtotal,clear}=useCart(); const [submitted,setSubmitted]=useState(false); const [order,setOrder]=useState(null); const [form,setForm]=useState({name:"",phone:"",email:"",method:"delivery",address:"",date:"",time:"",notes:"",payment:"cash"});
 const [errors,setErrors]=useState({});
 if(!cart.length&&!submitted)return <Page><section className="empty cart-empty"><h1>Your cart is empty</h1><p>Add something delicious before checking out.</p><Link to="/menu" className="btn btn-dark">Explore Menu</Link></section></Page>;
 const delivery=form.method==="delivery"?CONFIG.deliveryFee:0,total=subtotal+delivery;
 const set=(k,v)=>setForm(f=>({...f,[k]:v}));
 const validate=()=>{let e={};if(!form.name.trim())e.name="Please enter your full name.";if(!/^[0-9+ ()-]{9,}$/.test(form.phone))e.phone="Please enter a valid phone number.";if(form.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))e.email="Please enter a valid email address.";if(form.method==="delivery"&&!form.address.trim())e.address="Please enter your delivery address.";if(!form.date)e.date="Please select a delivery date.";if(!form.time)e.time="Please select a preferred time.";setErrors(e);return !Object.keys(e).length};
 const whatsapp=()=>{const lines=cart.map(i=>`${i.name}${i.size?` (${i.size})`:""} × ${i.quantity}`).join("%0A"); const msg=`Hello HomeBakes, I would like to place an order:%0A%0A${lines}%0A%0ATotal: ${money(total)}%0A%0AName: ${form.name}%0APhone: ${form.phone}%0ADelivery/Pickup: ${form.method}%0AAddress: ${form.address}%0APreferred Date: ${form.date}%0APreferred Time: ${form.time}%0ASpecial Instructions: ${form.notes}`;window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`,"_blank")};
 const submit=e=>{e.preventDefault();if(!validate())return;const o={number:`HB-${Date.now().toString().slice(-7)}`,...form,items:cart,total,status:"Order Received"};setOrder(o);localStorage.setItem("homebakes-last-order",JSON.stringify(o));setSubmitted(true);clear()};
 if(submitted)return <Page><section className="confirmation"><div className="confirm-icon"><CheckCircle2/></div><span className="eyebrow">Order received</span><h1>Thank you, {order.name.split(" ")[0]}! 🎉</h1><p>Your HomeBakes order has been received. We’ll confirm the details with you shortly.</p><div className="order-card"><div className="order-number"><span>Order number</span><strong>{order.number}</strong></div>{order.items.map(i=><div className="confirm-item" key={i.key}><span>{i.name}{i.size&&` · ${i.size}`} × {i.quantity}</span><b>{money(i.price*i.quantity)}</b></div>)}<div className="confirm-total"><span>Total</span><b>{money(order.total)}</b></div><div className="status"><span className="status-dot"/>{order.status}</div><div className="confirm-meta"><span><Store/> {order.method==="pickup"?"Pickup":"Delivery"}</span><span><Clock3/> {order.date} · {order.time}</span></div></div><div className="status-line"><span>Order Received</span><span>Preparing</span><span>Ready</span><span>Out for Delivery</span><span>Completed</span></div><div className="hero-actions"><Link to="/menu" className="btn btn-dark">Continue Shopping</Link><button className="btn btn-gold" onClick={whatsapp}>Send Order on WhatsApp <MessageCircle/></button></div></section></Page>;
 return <Page><section className="section checkout"><div className="page-title"><span className="eyebrow">Almost there</span><h1>Checkout</h1><p>Tell us where and when you’d like your treats.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><fieldset><legend>Customer Details</legend><div className="form-grid"><Field label="Full Name" required value={form.name} onChange={v=>set("name",v)} error={errors.name}/><Field label="Phone Number" required type="tel" value={form.phone} onChange={v=>set("phone",v)} error={errors.phone}/><Field label="Email Address" type="email" value={form.email} onChange={v=>set("email",v)} error={errors.email}/></div></fieldset><fieldset><legend>Delivery or Pickup</legend><div className="method-grid"><button type="button" className={form.method==="delivery"?"method active":"method"} onClick={()=>set("method","delivery")}><Truck/><b>Delivery</b><small>Fresh to your door</small></button><button type="button" className={form.method==="pickup"?"method active":"method"} onClick={()=>set("method","pickup")}><Store/><b>Pickup</b><small>Collect from HomeBakes</small></button></div>{form.method==="delivery"&&<Field label="Delivery Address" required value={form.address} onChange={v=>set("address",v)} error={errors.address} placeholder="House, street, area, landmark"/>}<div className="form-grid"><Field label="Preferred Date" required type="date" value={form.date} onChange={v=>set("date",v)} error={errors.date}/><Field label="Preferred Time" required type="time" value={form.time} onChange={v=>set("time",v)} error={errors.time}/></div><label className="field"><span>Special Instructions</span><textarea rows="4" value={form.notes} onChange={e=>set("notes",e.target.value)} placeholder="e.g. Please write Happy Birthday Sarah on the cake."/></label></fieldset><fieldset><legend>Payment Method</legend><div className="payment-grid">{[["mobile","Mobile Money",Smartphone],["card","Card",CreditCard],["cash","Cash on Delivery",Banknote],["pickup","Pay on Pickup",Store]].map(([v,t,I])=><button type="button" key={v} className={form.payment===v?"payment active":"payment"} onClick={()=>set("payment",v)}><I/><span>{t}</span></button>)}</div><p className="note"><ShieldCheck/> No payment is processed on this demo checkout. Connect a real gateway before accepting online payments.</p></fieldset><button className="btn btn-gold submit" type="submit">Place Order <CheckCircle2/></button></form><aside className="summary checkout-summary"><h3>Your Order</h3>{cart.map(i=><div className="mini-item" key={i.key}><span>{i.name}{i.size&&` · ${i.size}`} × {i.quantity}</span><b>{money(i.price*i.quantity)}</b></div>)}<div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery Fee</span><b>{money(delivery)}</b></div><div className="grand"><span>Grand Total</span><b>{money(total)}</b></div><button type="button" className="whatsapp-btn" onClick={whatsapp}><MessageCircle/> Order on WhatsApp</button></aside></div></section></Page>
}

function Field({label,required,type="text",value,onChange,error,placeholder=""}){return <label className="field"><span>{label}{required&&<i> *</i>}</span><input type={type} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)} aria-invalid={!!error}/>{error&&<small className="error">{error}</small>}</label>}

function CustomCakes(){
 const [sent,setSent]=useState(false); const [form,setForm]=useState({name:"",phone:"",email:"",type:"Celebration cake",size:"8 inch",flavor:"Vanilla",filling:"Vanilla cream",colors:"",message:"",event:"Birthday",date:"",budget:"",requirements:""});
 const set=(k,v)=>setForm(f=>({...f,[k]:v}));
 if(sent)return <Page><section className="confirmation"><div className="confirm-icon"><CheckCircle2/></div><span className="eyebrow">Request received</span><h1>Let’s create your dream cake.</h1><p>Thanks, {form.name || "there"}! Your custom cake brief is ready. We’ll contact you to discuss the design, availability and final quote.</p><Link to="/menu" className="btn btn-dark">Explore the Menu</Link></section></Page>;
 return <Page><section className="page-hero custom-hero"><span className="eyebrow">Made just for you</span><h1>Create Your Dream Cake</h1><p>Tell us what you’re imagining. We’ll turn your idea into something delicious.</p></section><section className="section custom-section"><form className="custom-form" onSubmit={e=>{e.preventDefault();setSent(true)}}><div className="form-grid"><Field label="Name" required value={form.name} onChange={v=>set("name",v)}/><Field label="Phone" required value={form.phone} onChange={v=>set("phone",v)}/><Field label="Email" type="email" value={form.email} onChange={v=>set("email",v)}/><Select label="Cake Type" value={form.type} onChange={v=>set("type",v)} options={["Celebration cake","Birthday cake","Wedding cake","Graduation cake","Anniversary cake"]}/><Select label="Cake Size" value={form.size} onChange={v=>set("size",v)} options={["6 inch","8 inch","10 inch","12 inch","Custom"]}/><Select label="Flavor" value={form.flavor} onChange={v=>set("flavor",v)} options={["Vanilla","Chocolate","Red Velvet","Carrot","Black Forest","Strawberry"]}/><Select label="Filling" value={form.filling} onChange={v=>set("filling",v)} options={["Vanilla cream","Chocolate ganache","Strawberry","Cream cheese","Caramel","No filling"]}/><Field label="Preferred Colors" value={form.colors} onChange={v=>set("colors",v)} placeholder="e.g. cream, gold & sage"/><Select label="Event Type" value={form.event} onChange={v=>set("event",v)} options={["Birthday","Wedding","Graduation","Anniversary","Baby shower","Other"]}/><Field label="Event Date" type="date" required value={form.date} onChange={v=>set("date",v)}/><Field label="Budget (UGX)" value={form.budget} onChange={v=>set("budget",v)} placeholder="e.g. 150000"/><label className="field full-span"><span>Message on Cake</span><input value={form.message} onChange={e=>set("message",e.target.value)} placeholder="e.g. Happy 21st Sarah!"/></label><label className="field full-span"><span>Special Requirements</span><textarea rows="5" value={form.requirements} onChange={e=>set("requirements",e.target.value)} placeholder="Describe decorations, theme, dietary needs, serving size or anything else we should know."/></label><label className="upload full-span"><Upload/><span><b>Inspiration image</b><small>Upload a reference image (optional)</small></span><input type="file" accept="image/*"/></label></div><button className="btn btn-gold submit" type="submit">Request Custom Cake <Send/></button></form></section></Page>
}
function Select({label,value,onChange,options}){return <label className="field"><span>{label}</span><div className="select-wrap"><select value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select><ChevronDown/></div></label>}

function About(){return <Page><section className="page-hero"><span className="eyebrow">Our story</span><h1>Baked With Love.</h1><p>HomeBakes is a little bakery with a big love for beautiful cakes, fresh pastries and the moments they help celebrate.</p></section><section className="section about-story"><div><img src={img("1558636508-e0db3814bd1d")} alt="HomeBakes cake"/></div><div><span className="eyebrow">The HomeBakes way</span><h2>Homemade goodness, made to feel special.</h2><p>At HomeBakes, we believe every celebration deserves something delicious.</p><p>From beautifully decorated cakes to freshly baked pastries and sweet treats, we create homemade goodness using quality ingredients and plenty of care.</p><p>Whether you’re celebrating a birthday, wedding, graduation, anniversary or simply treating yourself, HomeBakes is here to make every moment sweeter.</p><Link to="/custom-cakes" className="btn btn-dark">Create Your Cake <ArrowRight/></Link></div></section><Why/><section className="section"><div className="values"><div><Sparkles/><h3>Freshness first</h3><p>We bake with the joy of serving treats at their best.</p></div><div><Heart/><h3>Personal touch</h3><p>Your order matters, especially when the moment matters.</p></div><div><ShieldCheck/><h3>Quality always</h3><p>Thoughtful ingredients and careful preparation are part of every bake.</p></div></div></section></Page>}

function Contact(){return <Page><section className="page-hero"><span className="eyebrow">We’d love to hear from you</span><h1>Come say hello.</h1><p>Questions, cake ideas or a last-minute sweet craving? We’re here to help.</p></section><section className="section contact-layout"><div className="contact-card"><h2>Contact HomeBakes</h2><a href={`mailto:${CONFIG.email}`}><Mail/><div><small>Email</small><b>{CONFIG.email}</b></div></a><a href={`tel:${CONFIG.phone}`}><Phone/><div><small>Phone</small><b>{CONFIG.phone}</b></div></a><a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank"><MessageCircle/><div><small>WhatsApp</small><b>Chat with HomeBakes</b></div></a><div><MapPin/><div><small>Location</small><b>{CONFIG.address}</b></div></div><div><Clock3/><div><small>Opening hours</small><b>{CONFIG.hours}</b></div></div></div><div className="map-placeholder"><MapPin size={48}/><h3>HomeBakes · Kampala</h3><p>Location details can be updated in <code>src/config.js</code> / CONFIG.</p><a className="btn btn-dark" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.address)}`} target="_blank">Open in Maps <ArrowRight/></a></div></section><CTA/></Page>}

function App(){return <BrowserRouter><CartProvider><Routes><Route path="/" element={<Home/>}/><Route path="/menu" element={<MenuPage/>}/><Route path="/product/:id" element={<ProductPage/>}/><Route path="/cart" element={<CartPage/>}/><Route path="/checkout" element={<CheckoutPage/>}/><Route path="/custom-cakes" element={<CustomCakes/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/></Routes></CartProvider></BrowserRouter>}
createRoot(document.getElementById("root")).render(<App/>);
