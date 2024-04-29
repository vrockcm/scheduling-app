import React, { useState } from "react";
import {
  NoFlexContainer,
  FullHeightContainer,
  Inner,
  Outer,
  Container,
  SplitItemsContainer,
  SplitItemsWithSpaceContainer,
} from "../../commons";
import AppHeader from "../../commons/appheader";
import { Grid, Cell, STYLE, ALIGNMENT } from "baseui/layout-grid";
import { getPastBookings, handleRateBooking } from "../../utils/resource";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Tag, VARIANT } from "baseui/tag";
import { Button, KIND } from "baseui/button";
import {
  HeadingLarge,
  HeadingXSmall,
  LabelLarge,
  LabelMedium,
} from "baseui/typography";
import { Block } from "baseui/block";
import { Radio, RadioGroup } from "baseui/radio";
import { StarRating } from "baseui/rating";
import { Textarea } from "baseui/textarea";

const History = () => {
  const [data, setData] = React.useState(null);
  const [filteredData, setFilteredData] = React.useState(null);
  const [value, setValue] = React.useState("1");
  const [editedBookings, setEditedBookings] = React.useState([]);

  React.useEffect(() => {
    const filteredData =
      value === "1"
        ? data
        : Object.fromEntries(
            Object.entries(data).filter(([key, bookings]) =>
              bookings.some((booking) => booking.rating === null)
            )
          );
    setFilteredData(filteredData);
  }, [value, data]);

  function fetchUserDetails() {
    getPastBookings().then((resp) => {
      setData(resp.data);
      setEditedBookings([]);
    });
  }

  React.useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <FullHeightContainer>
      <AppHeader />
      <NoFlexContainer>
        <Block padding={"20px"}>
          <SplitItemsWithSpaceContainer>
            <HeadingLarge $style={{ textAlign: "center" }}>
              Coach History
            </HeadingLarge>
            <div>
              <RadioGroup
                align="horizontal"
                name="horizontal"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              >
                <Radio value="1">All</Radio>
                <Radio value="2">Rate Pending</Radio>
              </RadioGroup>
            </div>
          </SplitItemsWithSpaceContainer>

          {filteredData && Object.entries(filteredData).length > 0 ? (
            Object.entries(filteredData).map(([date, bookings]) => (
              <Outer>
                <HeadingXSmall margin="10px" style={{ textAlign: "center" }}>
                  {date}
                </HeadingXSmall>
                <Grid
                  gridStyle={STYLE.compact}
                  gridGutters={0}
                  align={ALIGNMENT.center}
                  overrides={{
                    Root: {
                      style: {
                        justifyContent: "center",
                      },
                    },
                  }}
                >
                  {bookings.map((d) => (
                    <Cell span={[12, 6]}>
                      <Inner>
                        <Card key={d.id} $style={{ width: "100%" }}>
                          <StyledBody>
                            <Container>
                              <LabelLarge $style={{ textAlign: "center" }}>
                                {d.coach.name}
                              </LabelLarge>
                              <Tag
                                closeable={false}
                                variant={VARIANT.solid}
                                kind="accent"
                              >
                                Coach
                              </Tag>
                            </Container>
                            <SplitItemsContainer>
                              <Block>
                                <LabelMedium>Name: {d.name}</LabelMedium>
                                <LabelMedium>
                                  Phone Number: {d.phone}
                                </LabelMedium>
                                <LabelMedium>
                                  Time: {d.startTime} - {d.endTime}
                                </LabelMedium>
                                <LabelMedium>Duration 2hr</LabelMedium>
                              </Block>
                              <Block>
                                <StarRating
                                  numItems={5}
                                  onChange={(data) => {
                                    const existing = editedBookings.find(
                                      (b) => b.id === d.id
                                    );
                                    if (existing) {
                                      setEditedBookings(
                                        editedBookings.map((b) =>
                                          b.id === d.id
                                            ? { ...b, rating: data.value }
                                            : b
                                        )
                                      );
                                    } else {
                                      setEditedBookings([
                                        ...editedBookings,
                                        { ...d, rating: data.value },
                                      ]);
                                    }
                                  }}
                                  size={22}
                                  value={
                                    editedBookings.find((b) => b.id === d.id)
                                      ?.rating || d.rating
                                  }
                                />
                                <Textarea
                                  value={
                                    editedBookings.find((b) => b.id === d.id)
                                      ?.notes || d.notes
                                  }
                                  onChange={(e) => {
                                    const existing = editedBookings.find(
                                      (b) => b.id === d.id
                                    );
                                    if (existing) {
                                      setEditedBookings(
                                        editedBookings.map((b) =>
                                          b.id === d.id
                                            ? { ...b, notes: e.target.value }
                                            : b
                                        )
                                      );
                                    } else {
                                      setEditedBookings([
                                        ...editedBookings,
                                        { ...d, notes: e.target.value },
                                      ]);
                                    }
                                  }}
                                  clearOnEscape
                                />
                              </Block>
                            </SplitItemsContainer>
                          </StyledBody>
                          {editedBookings.find((b) => b.id === d.id) && (
                            <SplitItemsContainer>
                              <StyledAction>
                                <Button
                                  kind={KIND.secondary}
                                  onClick={() => {
                                    setEditedBookings(
                                      editedBookings.filter(
                                        (b) => b.id !== d.id
                                      )
                                    );
                                  }}
                                >
                                  Cancel
                                </Button>
                              </StyledAction>
                              <StyledAction>
                                <Button
                                  kind={KIND.primary}
                                  onClick={() => {
                                    const booking = editedBookings.find(
                                      (b) => b.id === d.id
                                    );
                                    handleRateBooking(
                                      d.id,
                                      booking.rating,
                                      booking.notes
                                    ).then(() => {
                                      fetchUserDetails();
                                    });
                                  }}
                                >
                                  Save
                                </Button>
                              </StyledAction>
                            </SplitItemsContainer>
                          )}
                        </Card>
                      </Inner>
                    </Cell>
                  ))}
                </Grid>
              </Outer>
            ))
          ) : (
            <HeadingXSmall margin="10px" style={{ textAlign: "center" }}>
              No Bookings
            </HeadingXSmall>
          )}
        </Block>
      </NoFlexContainer>
    </FullHeightContainer>
  );
};

export default History;
