import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContent } from "../components/CreateContent"
import { PlusIcon } from "../components/icons/PlusIcon"
import '../index.css'
import { SideBar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import { LogoutIcon } from "../components/icons/LogoutIcon"
import { useNavigate } from "react-router-dom"
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4, 
  1100: 2,   
  700: 1, 
};

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modelOpen]);

  return (
    
    <div className="">
      <SideBar refresh={refresh} />
      <div className="p-2 ml-56 min-h-screen bg-gray-100 ">
        <CreateContent
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
        ></CreateContent>
        
        <div className="sticky top-0 bg-gray-100 flex justify-end gap-4 p-2">
          <Button
            onClick={() => {
              setModelOpen(true);
            }}
            startIcon={<PlusIcon />}
            variant="secondary"
            text="Add Content"
          />
          <Button
            startIcon={<LogoutIcon />}
            variant="logout"
            text="Logout"
            onClick={Logout}
          />
        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid pt-4" 
          columnClassName="masonry-column gap-2" 
        >
          {contents.map((content) => (
            <div key={content._id}>
              <Card
                refresh={refresh}
                type={content.type}
                link={content.link}
                title={content.title}
                _id={content._id}
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );

  function Logout() {
    localStorage.removeItem("token");
    navigate("/homepage");
  }
}


