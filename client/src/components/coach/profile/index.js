import * as React from "react";
import AppHeader from "../../commons/appheader";
import {
  Container,
  SplitItemsWithSpaceContainer,
  FullHeightContainer,
} from "../../commons";
import { HeadingSmall, LabelMedium } from "baseui/typography";
import { Table, DIVIDER } from "baseui/table-semantic";
import { Block } from "baseui/block";
import { getUserDetails } from "../../utils/resource";
import { Button, SHAPE } from "baseui/button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [schedule, setSchedule] = React.useState([]);
  const [timezone, setTimezone] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    function fetchUserDetails() {
      const id = window.location.pathname.split("/")[3];
      getUserDetails(id)
        .then((response) => {
          setSchedule(response.data.schedule);
          setTimezone(response.data.timezone);
        })
        .catch((err) => console.error(err));
    }
    fetchUserDetails();
  }, []);

  return (
    <FullHeightContainer>
      <AppHeader />
      <Container>
        <SplitItemsWithSpaceContainer>
          <HeadingSmall>Working Schedule</HeadingSmall>
          <div>
            <Button
              shape={SHAPE.pill}
              onClick={() => {
                navigate(
                  `/coaches/profile/${
                    window.location.pathname.split("/")[3]
                  }/edit`
                );
              }}
            >
              Edit
            </Button>
          </div>
        </SplitItemsWithSpaceContainer>
        <LabelMedium>Timezone: {timezone}</LabelMedium>

        <Block margin="10px 0px 10px 0px" />
        <div style={{ width: "80%" }}>
          <Table
            columns={["Day", "Start Time", "End Time"]}
            divider={DIVIDER.grid}
            data={schedule.map((s) => [s.day, s.startTime, s.endTime])}
          />
        </div>
      </Container>
    </FullHeightContainer>
  );
}
