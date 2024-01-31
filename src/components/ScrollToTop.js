import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // reset posisi scroll tiap pindah halaman
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
