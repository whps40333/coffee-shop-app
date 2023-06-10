import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  navigate("/coffee-shop-spp/");
}

export default NotFoundPage;
