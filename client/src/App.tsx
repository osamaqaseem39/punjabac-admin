import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Ecommerce from "./pages/Dashboard/ECommerce";
import NotFound from "./pages/OtherPage/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BlogList from "./pages/Blog/BlogList";
import BlogForm from "./pages/Blog/BlogForm";
import BlogDetail from "./pages/Blog/BlogDetail";
import ProductList from './pages/Products/ProductList';
import ProductForm from './pages/Products/ProductForm';
import ProductDetail from './pages/Products/ProductDetail';
import ServiceList from './pages/Services/ServiceList';
import ServiceForm from './pages/Services/ServiceForm';
import ServiceDetail from './pages/Services/ServiceDetail';
import MessageList from "./pages/Messages/MessageList";
import CategoryList from "./pages/Category/CategoryList";
import CategoryForm from "./pages/Category/CategoryForm";
import CategoryDetail from "./pages/Category/CategoryDetail";
import BrandList from "./pages/Brand/BrandList";
import BrandForm from "./pages/Brand/BrandForm";
import BenefitList from "./pages/Benefits/BenefitList";
import BenefitDetail from "./pages/Benefits/BenefitDetail";
import BenefitForm from "./pages/Benefits/BenefitForm";
import BrandDetail from "./pages/Brand/BrandDetail";
import AutoCompanyForm from "./pages/AutoCompany/AutoCompanyForm";
import AutoCompanyList from "./pages/AutoCompany/AutoCompanyList";
import AutoCompanyDetail from "./pages/AutoCompany/AutoCompanyDetail";





export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Auth Layout - Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Protected Dashboard Layout */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            {/* Main Dashboard */}
            <Route index element={<Ecommerce />} />

            {/* Blog Routes */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/add" element={<BlogForm mode='add' />} />
            <Route path="/blog/edit/:id" element={<BlogForm mode='edit' />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />

            {/* Products Routes */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<ProductForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/:id/edit" element={<ProductForm />} />

            {/* Category Routes */}
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/add" element={<CategoryForm />} />
            <Route path="/categories/:id" element={<CategoryDetail />} />
            <Route path="/categories/:id/edit" element={<CategoryForm />} />


            {/* Brand Routes */}
            <Route path="/brands" element={<BrandList />} />
            <Route path="/brands/add" element={<BrandForm />} />
            <Route path="/brands/:id" element={<BrandDetail />} />
            <Route path="/brands/:id/edit" element={<BrandForm />} />


            <Route path="/benefits" element={<BenefitList />} />
            <Route path="/benefits/add" element={<BenefitForm />} />
            <Route path="/benefits/:id" element={<BenefitDetail />} />
            <Route path="/benefits/:id/edit" element={<BenefitForm />} />

            {/* Services Routes */}
            <Route path="/services" element={<ServiceList />} />
            <Route path="/services/add" element={<ServiceForm />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/services/:id/edit" element={<ServiceForm />} />

            {/* Auto Company Routes */}
            <Route path="/auto-companies" element={<AutoCompanyList />} />
            <Route path="/auto-companies/add" element={<AutoCompanyForm mode="add" />} />
            <Route path="/auto-companies/:id" element={<AutoCompanyDetail />} />
            <Route path="/auto-companies/:id/edit" element={<AutoCompanyForm mode="edit" />} />


            {/* Benefits Routes */}


            <Route path="/messages" element={<MessageList/>}/>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}
