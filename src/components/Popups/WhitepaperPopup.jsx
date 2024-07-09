import React from "react";
import "./Popup.sass";
import { useQuery } from "react-query";
import { pageQuery } from "@/app/queries/staticPages";
import getData from "@/app/queries/getData";

const pageTitle = "WHITEPAPER";

const WhitepaperPopup = ({ isOpen, onClose }) => {

  const { data: page } = useQuery(
    "page",
    async () => await getData(pageQuery, "pages", { title: pageTitle }),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!isOpen) return null;

  return (
    <div className="cloud-popup">
      <div className="cloud-popup__content">
        <button className="cloud-popup__btn-close" onClick={onClose}></button>
        <h4 className="cloud-popup__title">{page[0].Title}</h4>
        <div className="cloud-popup__text-box">
          <p className="cloud-popup__text" dangerouslySetInnerHTML={{ __html: page[0].Content }}></p>
        </div>
      </div>
    </div>
  );
};

export default WhitepaperPopup;
