import * as React from "react";
import AppHeader from "../../commons/appheader";
import { FullHeightContainer } from "../../commons";
import { getAllCoaches } from "../../utils/resource";
import { MessageCard, BACKGROUND_COLOR_TYPE } from "baseui/message-card";
import { Block } from "baseui/block";
import { useNavigate } from "react-router-dom";

export default function AllCoaches() {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    function fetchUserDetails() {
      getAllCoaches()
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => console.error(err));
    }
    fetchUserDetails();
  }, []);

  return (
    <FullHeightContainer>
      <AppHeader />
      <Block padding={"10px"} w>
        {data.map((d) => (
          <>
            <MessageCard
              heading={d.name}
              buttonLabel="View Schedule"
              onClick={() => navigate(`/coaches/profile/${d.id}`)}
              backgroundColor="#101010"
              backgroundColorType={BACKGROUND_COLOR_TYPE.dark}
            />

            <Block margin="10px 0px 10px 0px" />
          </>
        ))}
      </Block>
    </FullHeightContainer>
  );
}
