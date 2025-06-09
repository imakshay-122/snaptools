import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import BlogLayout from "./pages/BlogLayout";
import UnitConversionGuide from "./post/UnitConversionGuide";


const BlogList = lazy(() => import("./pages/BlogList"));
const PDFManipulationTechniques = lazy(() => import("./post/PDFManipulationTechniques"));
const ImageOptimizationGuide = lazy(() => import("./post/ImageOptimizationGuide"));
const SecurePasswordGuide = lazy(() => import("./post/SecurePasswordGuide"));
const QRCodeBestPractices = lazy(() => import("./post/QRCodeBestPractices"));
const DeveloperToolkitGuide = lazy(() => import("./post/DeveloperToolkitGuide"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const BlogRouter = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route
          path="/posts/pdf-manipulation-techniques"
          element={<BlogLayout><PDFManipulationTechniques /></BlogLayout>}
        />
        <Route
          path="/posts/image-optimization-guide"
          element={<BlogLayout><ImageOptimizationGuide /></BlogLayout>}
        />
        <Route
          path="/posts/secure-password-guide"
          element={<BlogLayout><SecurePasswordGuide /></BlogLayout>}
        />
        <Route
          path="/posts/qr-code-best-practices"
          element={<BlogLayout><QRCodeBestPractices /></BlogLayout>}
        />
        <Route
          path="/posts/unit-conversion-guide"
          element={<BlogLayout><UnitConversionGuide /></BlogLayout>}
        />
        <Route
          path="/posts/developer-tool-kit-guide"
          element={<BlogLayout><DeveloperToolkitGuide /></BlogLayout>}
        />
      </Routes>
    </Suspense>
  );
};

export default BlogRouter;