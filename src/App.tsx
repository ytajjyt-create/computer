/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, Order, CustomPCBuild, ProductCategory, Review } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { PCBuilder } from './components/PCBuilder';
import { ProductModal } from './components/ProductModal';
import { ComparisonModal } from './components/ComparisonModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTracker } from './components/OrderTracker';
import { DiagnosticTool } from './components/DiagnosticTool';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('store');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory>('all');
  const [productsList, setProductsList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('valence_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure any newly added catalog items in PRODUCTS are merged
        const missing = PRODUCTS.filter((p) => !parsed.some((existing: Product) => existing.id === p.id));
        return [...parsed, ...missing];
      } catch (e) {
        return PRODUCTS;
      }
    }
    return PRODUCTS;
  });

  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('valence_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Pre-populate with one flagship item for rich immediate storefront feel
    return [
      {
        id: 'cart-init-1',
        product: PRODUCTS[0],
        quantity: 1,
        warrantyTier: 'standard',
      },
    ];
  });

  // Comparison tray state
  const [compareList, setCompareList] = useState<Product[]>([]);

  // Placed orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('valence_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState<{ code: string; amount: number }>({
    code: '',
    amount: 0,
  });

  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Toast feedback notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('valence_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('valence_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('valence_products', JSON.stringify(productsList));
  }, [productsList]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add individual product to cart
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    warrantyTier: 'standard' | 'extended' = 'standard'
  ) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.warrantyTier === warrantyTier
      );
      if (existingIdx >= 0) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          quantity,
          warrantyTier,
        };
        return [...prevCart, newItem];
      }
    });

    showToast(`Added ${product.name} to cart`);
  };

  // Add complete custom PC build to cart
  const handleAddBuildToCart = (
    build: CustomPCBuild,
    assemblyOption: 'diy' | 'bench_tested'
  ) => {
    const buildName = `Custom Rig (${build.cpu?.name?.split(' ')[1] || 'CPU'} + ${
      build.gpu?.name?.split(' ')[1] || 'GPU'
    })`;

    // Synthetic bundle product representing the custom configuration
    const bundleProduct: Product = {
      id: `custom-rig-${Date.now()}`,
      name: buildName,
      brand: 'VALENCE CUSTOM LAB',
      category: 'desktops',
      price: [
        build.cpu,
        build.cooler,
        build.motherboard,
        build.ram,
        build.gpu,
        build.storage,
        build.case,
        build.psu,
      ].reduce((acc, p) => acc + (p?.price || 0), 0),
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockCount: 1,
      badge: 'CUSTOM ARCHITECT RIG',
      image:
        build.case?.image ||
        'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
      shortDesc: `${build.cpu?.name || 'High-end CPU'} · ${build.gpu?.name || 'GPU'} · ${
        build.ram?.name || 'RAM'
      }`,
      fullDesc: 'Custom workstation rig configured in the Valence Architect Studio. Includes 48-hour synthetic stress verification.',
      specs: [
        { label: 'CPU', value: build.cpu?.name || 'Selected CPU' },
        { label: 'GPU', value: build.gpu?.name || 'Selected GPU' },
        { label: 'Motherboard', value: build.motherboard?.name || 'Selected Board' },
        { label: 'Memory', value: build.ram?.name || 'Selected RAM' },
        { label: 'Storage', value: build.storage?.name || 'Selected Storage' },
        { label: 'Cooling', value: build.cooler?.name || 'Selected Cooler' },
        { label: 'Chassis', value: build.case?.name || 'Selected Chassis' },
        { label: 'Power Supply', value: build.psu?.name || 'Selected PSU' },
        {
          label: 'Assembly Method',
          value:
            assemblyOption === 'bench_tested'
              ? 'White-Glove 48h Burn-in Tested'
              : 'Self-Assembly DIY Kit',
        },
      ],
      reviews: [],
    };

    const newCartItem: CartItem = {
      id: `build-cart-${Date.now()}`,
      product: bundleProduct,
      quantity: 1,
      customBuild: build,
      warrantyTier: 'standard',
    };

    setCart((prev) => [...prev, newCartItem]);
    setIsCartOpen(true);
    showToast('Custom Rig bundle added to cart!');
  };

  // Toggle comparison list
  const handleToggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast('Maximum 4 components can be compared simultaneously');
        return prev;
      }
      showToast(`Added ${product.name} to comparison matrix`);
      return [...prev, product];
    });
  };

  // Add review to product
  const handleAddReview = (productId: string, review: Review) => {
    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [review, ...p.reviews];
          const newAvg =
            updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
          return {
            ...p,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            rating: Math.round(newAvg * 100) / 100,
          };
        }
        return p;
      })
    );

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => {
        if (!prev) return null;
        const updatedReviews = [review, ...prev.reviews];
        const newAvg =
          updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
        return {
          ...prev,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: Math.round(newAvg * 100) / 100,
        };
      });
    }

    showToast('Verified review submitted!');
  };

  const flagshipProduct = productsList.find((p) => p.id === 'pc-apex-5090') || productsList[0];

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'prebuilts') {
            setCategoryFilter('desktops');
          } else if (tab === 'laptops') {
            setCategoryFilter('laptops');
          } else if (tab === 'store') {
            setCategoryFilter('all');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        compareList={compareList}
        setIsCompareOpen={setIsCompareOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        allProducts={productsList}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Main Content Areas based on activeTab */}
      <main className="flex-1">
        {activeTab === 'store' && (
          <>
            <HeroBanner
              onStartBuilder={() => {
                setActiveTab('builder');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExplorePrebuilts={() => {
                setActiveTab('prebuilts');
                setCategoryFilter('desktops');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              flagshipProduct={flagshipProduct}
              onViewProduct={(p) => setSelectedProduct(p)}
            />

            <ProductCatalog
              products={productsList}
              onViewProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p)}
              onToggleCompare={handleToggleCompare}
              compareList={compareList}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          </>
        )}

        {activeTab === 'prebuilts' && (
          <div className="py-6">
            <ProductCatalog
              products={productsList}
              onViewProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p)}
              onToggleCompare={handleToggleCompare}
              compareList={compareList}
              initialCategory="desktops"
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          </div>
        )}

        {activeTab === 'laptops' && (
          <div className="py-6">
            <ProductCatalog
              products={productsList}
              onViewProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p)}
              onToggleCompare={handleToggleCompare}
              compareList={compareList}
              initialCategory="laptops"
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          </div>
        )}

        {activeTab === 'builder' && (
          <PCBuilder
            onAddBuildToCart={handleAddBuildToCart}
            onViewProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {activeTab === 'diagnostics' && (
          <DiagnosticTool
            onLoadBuild={(cpuId, gpuId) => {
              setActiveTab('builder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              showToast('Optimal synergy pair loaded into Rig Architect!');
            }}
          />
        )}

        {activeTab === 'tracker' && (
          <OrderTracker
            orders={orders}
            onExploreStore={() => {
              setActiveTab('store');
              setCategoryFilter('all');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveTab('store');
          setCategoryFilter(cat);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleCompare={handleToggleCompare}
        isCompared={
          selectedProduct ? compareList.some((p) => p.id === selectedProduct.id) : false
        }
        onAddReview={handleAddReview}
      />

      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={compareList}
        onRemoveProduct={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))}
        onClearAll={() => setCompareList([])}
        onAddToCart={(p) => handleAddToCart(p)}
        onViewProduct={(p) => {
          setSelectedProduct(p);
          setIsCompareOpen(false);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={(id, delta) => {
          setCart((prev) =>
            prev
              .map((item) => {
                if (item.id === id) {
                  const newQty = item.quantity + delta;
                  return newQty > 0 ? { ...item, quantity: newQty } : null;
                }
                return item;
              })
              .filter(Boolean) as CartItem[]
          );
        }}
        onRemoveItem={(id) => {
          setCart((prev) => prev.filter((item) => item.id !== id));
        }}
        onCheckout={(discountCode, discountAmount) => {
          setCheckoutDiscount({ code: discountCode, amount: discountAmount });
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        discountCode={checkoutDiscount.code}
        discountAmount={checkoutDiscount.amount}
        onOrderSuccess={(order) => {
          setOrders((prev) => [order, ...prev]);
          setCart([]); // Clear cart upon successful order
          showToast(`Order ${order.id} authorized & queued for bench assembly!`);
        }}
        onGoToTracker={(orderId) => {
          setActiveTab('tracker');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d1527] border border-cyan-500/40 text-cyan-200 text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5 font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
