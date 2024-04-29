import React, { useState } from "react";
import { Container, FullHeightContainer } from "../commons";
import AppHeader from "../commons/appheader";
import { StatefulCalendar } from "baseui/datepicker";
import { Card, StyledBody } from "baseui/card";
import { Tile, TileGroup, TILE_GROUP_KIND, TILE_KIND } from "baseui/tile";
import {
  getCoachAvailibility,
  handleBooking,
  getCoachDetails,
} from "../utils/resource";
import { LabelLarge, LabelMedium, LabelSmall } from "baseui/typography";
import { ArrowLeft } from "baseui/icon";
import { Button, SHAPE } from "baseui/button";
import moment from "moment";
import { Block } from "baseui/block";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Input } from "baseui/input";

const BookCoach = () => {
  const [selected, setSelected] = React.useState(-1);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const [coachData, setCoachData] = React.useState(null);
  const [availability, setAvailability] = React.useState(null);
  const [confirmed, setConfirmed] = React.useState("");

  React.useEffect(() => {
    function fetchUserDetails() {
      const id = window.location.pathname.split("/")[2];

      getCoachDetails(id).then((resp) => {
        setCoachData(resp.data);
      });

      if (selectedDate) {
        getCoachAvailibility(id, selectedDate)
          .then((resp) => {
            setAvailability(resp.data);
          })
          .catch((err) => {
            setAvailability(null);
          });
      }
    }
    fetchUserDetails();
  }, [selectedDate]);

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, "Full name must be at least 2 characters")
      .required("Full name is required"),
    phone: Yup.string()
      .matches(/^[+]?[\s0-9]{6,20}$/, "Must be a valid phone number")
      .required("Phone number is required"),
  });

  return (
    <FullHeightContainer>
      <AppHeader student />
      <Container>
        {coachData && (
          <Card
            title={`Schedule a Session with ${coachData?.name}`}
            overrides={{
              Root: {
                style: {
                  marginTop: "10em",
                },
              },
              Body: {
                style: {
                  display: "flex",
                  minHeight: "400px",
                  width: "600px",
                },
              },
            }}
          >
            <StyledBody
              style={{
                display: confirmed.length > 0 ? "block" : "flex",
                flexDirection: "row",
                flexWrap: "unset",
                overflow: "auto",
                scrollbarWidth: "none",
                width: "100%",
                padding: "10px",
                height: "400px",
              }}
            >
              {confirmed.length > 0 ? (
                <>
                  <LabelLarge style={{ color: "green" }} paddingTop={"10px"}>
                    Session Confirmed.
                  </LabelLarge>
                  <LabelLarge paddingTop={"10px"}>
                    Coach's Phone Number: {confirmed}
                  </LabelLarge>
                </>
              ) : (
                <>
                  {selected === -1 ? (
                    <>
                      <StatefulCalendar
                        minDate={new Date()}
                        onChange={({ date }) => setSelectedDate(date)}
                      />
                      {!availability ? (
                        <LabelMedium paddingTop={"10px"}>
                          No availability
                        </LabelMedium>
                      ) : (
                        <TileGroup
                          kind={TILE_GROUP_KIND.none}
                          selected={selected}
                          onClick={(_event, index) => setSelected(index)}
                          overrides={{
                            Root: {
                              style: {
                                width: "auto",
                                flexDirection: "column",
                                flexWrap: "unset",
                                overflow: "auto",
                                scrollbarWidth: "none",
                              },
                            },
                          }}
                        >
                          {availability?.availableTimes.map((time) => (
                            <Tile tileKind={TILE_KIND.selection} label={time} />
                          ))}
                        </TileGroup>
                      )}
                    </>
                  ) : (
                    <>
                      <Block paddingRight={"20px"}>
                        <Button
                          shape={SHAPE.circle}
                          onClick={() => setSelected(-1)}
                        >
                          <ArrowLeft size={32} />
                        </Button>
                        <LabelMedium paddingTop={"10px"}>
                          {coachData?.name}
                        </LabelMedium>
                        <LabelLarge paddingTop={"10px"}>
                          2 Hour Coaching Session
                        </LabelLarge>
                        <LabelMedium paddingTop={"10px"}>
                          {`${
                            availability?.availableTimes[selected]
                          } - ${moment(
                            availability?.availableTimes[selected],
                            "HH:mm"
                          )
                            .add(2, "h")
                            .format("HH:mm")} ${moment(selectedDate).format(
                            "MMMM Do YYYY"
                          )}`}
                        </LabelMedium>
                      </Block>
                      <Block
                        style={{
                          borderLeft: "1px solid #ccc",
                          padding: "10px",
                          width: "100%",
                        }}
                      >
                        <LabelMedium>Enter Details</LabelMedium>
                        <Formik
                          initialValues={{
                            fullName: "",
                            phone: "",
                          }}
                          validationSchema={validationSchema}
                          onSubmit={(values, actions) => {
                            handleBooking(
                              window.location.pathname.split("/")[2],
                              values.fullName,
                              values.phone,
                              moment(selectedDate).format("MM/DD/YYYY"),
                              availability?.availableTimes[selected]
                            ).then((resp) => {
                              if (resp.status === 200) {
                                setConfirmed(resp.data.message);
                              }
                            });
                            actions.setSubmitting(false);
                          }}
                        >
                          {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                          }) => (
                            <Form>
                              <Block padding={"16px 0px 16px 0px"}>
                                <LabelMedium paddingBottom={"10px"}>
                                  Full Name:
                                </LabelMedium>
                                <Input
                                  type="text"
                                  name="fullName"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.fullName}
                                  error={errors.fullName && touched.fullName}
                                />
                                {errors.fullName && touched.fullName && (
                                  <LabelSmall>{errors.fullName}</LabelSmall>
                                )}
                              </Block>
                              <Block padding={"0px 0px 16px 0px"}>
                                <LabelMedium paddingBottom={"10px"}>
                                  Phone Number:
                                </LabelMedium>
                                <Input
                                  type="text"
                                  name="phone"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.phone}
                                  error={errors.phone && touched.phone}
                                />
                                {errors.phone && touched.phone && (
                                  <LabelSmall>{errors.phone}</LabelSmall>
                                )}
                              </Block>
                              <Block
                                marginTop={"10px"}
                                display={"flex"}
                                justifyContent={"flex-end"}
                              >
                                <Button
                                  disabled={isSubmitting}
                                  onClick={handleSubmit}
                                  type="submit"
                                >
                                  Submit
                                </Button>
                              </Block>
                            </Form>
                          )}
                        </Formik>
                      </Block>
                    </>
                  )}
                </>
              )}
            </StyledBody>
          </Card>
        )}
      </Container>
    </FullHeightContainer>
  );
};

export default BookCoach;
