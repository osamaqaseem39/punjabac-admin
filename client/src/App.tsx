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
import BlogAdd from "./pages/Blog/BlogAdd";
import BlogDetail from "./pages/Blog/BlogDetail";
import BlogEdit from "./pages/Blog/BlogEdit";
import ProductList from './pages/Products/ProductList';
import ProductForm from './pages/Products/ProductForm';
import ProductDetail from './pages/Products/ProductDetail';
import ServiceList from './pages/Services/ServiceList';
import ServiceForm from './pages/Services/ServiceForm';
import ServiceDetail from './pages/Services/ServiceDetail';

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
            <Route path="/blog/add" element={<BlogAdd />} />
            <Route path="/blog/edit/:id" element={<BlogEdit />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />

            {/* Products Routes */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<ProductForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/:id/edit" element={<ProductForm />} />

            {/* Services Routes */}
            <Route path="/services" element={<ServiceList />} />
            <Route path="/services/add" element={<ServiceForm />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/services/:id/edit" element={<ServiceForm />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}
