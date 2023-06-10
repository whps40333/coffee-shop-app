import React, { useState } from "react";
import FavoriteSection from "./FavoriteSection/FavoriteSection";
import WritingSection from "./WritingSection/WritingSection";
import CommentSection from "./CommentSection/CommentSection";
import NavBar from "../../components/UI/Navbars/Navbar";
import MainHeader from "../../components/Header/MainHeader";

function UserLayout(props) {
  const [activeSection, setActiveSection] = useState(null);

  const SectionToggler = (sectionName) => {
    setActiveSection(activeSection === sectionName ? null : sectionName);
  };

  return (
    <div>
      <MainHeader
        isLoggedIn={props.isAuthenticated}
        onLogout={props.onLogout}
      />
      <div>
        <NavBar onSectionToggle={SectionToggler} />
        {activeSection === "writing" && <WritingSection />}
        {activeSection === "comment" && <CommentSection />}
        {activeSection === "favorite" && <FavoriteSection />}
      </div>
    </div>
  );
}

export default UserLayout;
