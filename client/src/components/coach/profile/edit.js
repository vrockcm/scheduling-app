import * as React from "react";
import { useStyletron } from "baseui";
import AppHeader from "../../commons/appheader";
import { TimezonePicker } from "baseui/timezonepicker";
import { Select, TYPE } from "baseui/select";
import { Combobox, SIZE as DROPDOWN_SIZE } from "baseui/combobox";
import { FormControl } from "baseui/form-control";
import { Grid, Cell, STYLE } from "baseui/layout-grid";
import { FullHeightContainer, Container, Outer, Inner } from "../../commons";
import { HeadingLarge, LabelMedium } from "baseui/typography";
import { ButtonDock } from "baseui/button-dock";
import { Button, KIND } from "baseui/button";
import {
  ProgressSteps,
  NumberedStep,
  ORIENTATION,
} from "baseui/progress-steps";
import { Block } from "baseui/block";
import { handleCreateSchedule } from "../../utils/resource";
import { useNavigate } from "react-router-dom";
import { Notification, KIND as NOTIFICATIONKIND } from "baseui/notification";

export default function EditProfile() {
  const [css, theme] = useStyletron();

  const [timeZone, setTimeZone] = React.useState("Europe/London");

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dayOptions = days.map((day) => ({
    id: day,
    label: day,
  }));

  const [daysPickerValue, setDaysPickerValue] = React.useState(
    dayOptions.slice(1, 6)
  );

  const [schedule, setSchedule] = React.useState([
    ...daysPickerValue.map((day) => ({
      day: day.id,
      startTime: "07:00",
      endTime: "18:00",
    })),
  ]);

  React.useEffect(() => {
    setSchedule([
      ...daysPickerValue.map((day) => ({
        day: day.id,
        startTime: "07:00",
        endTime: "18:00",
      })),
    ]);
  }, [daysPickerValue]);

  const hourOptions = [];
  for (let i = 7; i <= 18; i++) {
    hourOptions.push({ id: `${i}:00`, label: `${i}:00` });
  }

  const saveSchedule = () => {
    const id = window.location.pathname.split("/")[3];
    handleCreateSchedule(id, timeZone, schedule, navigate).catch((error) => {
      setError(true);
    });
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  return (
    <FullHeightContainer>
      <AppHeader />
      <Container>
        <HeadingLarge>Edit Schedule</HeadingLarge>
        <Block width={"100%"} display="flex" justifyContent="center">
          <ProgressSteps
            current={activeStep}
            orientation={ORIENTATION.horizontal}
            $style={{ flex: "0 1 auto", maxWidth: "100%" }}
          >
            <NumberedStep title="Select Time Zone" />
            <NumberedStep title="Select Working Days" />
            <NumberedStep title="Select Schedule" />
          </ProgressSteps>
        </Block>
        {error && (
          <Notification
            kind={NOTIFICATIONKIND.negative}
            overrides={{
              Body: { style: { width: "auto" } },
            }}
          ></Notification>
        )}
        <div
          className={css({
            flex: "1",
          })}
        >
          {activeStep === 0 && (
            <TimezonePicker
              value={timeZone}
              onChange={({ id }) => setTimeZone(id)}
              date={new Date()}
            />
          )}
          {activeStep === 1 && (
            <FormControl label="Select Days">
              <Select
                options={dayOptions}
                labelKey="label"
                valueKey="id"
                placeholder="Choose Work Days"
                maxDropdownHeight="300px"
                type={TYPE.search}
                multi
                onChange={({ value }) => {
                  setDaysPickerValue(value);
                }}
                value={daysPickerValue}
              />
            </FormControl>
          )}
          {activeStep === 2 && (
            <Outer>
              <Grid gridStyle={STYLE.compact} gridGutters={0}>
                <Cell span={[2, 2, 2]} />
                <Cell span={[5, 3, 5]}>
                  <Inner>
                    <LabelMedium>Start Time</LabelMedium>
                  </Inner>
                </Cell>
                <Cell span={[5, 3, 5]}>
                  <Inner>
                    <LabelMedium>End Time</LabelMedium>
                  </Inner>
                </Cell>
                {schedule.map(({ day, startTime, endTime }, index) => (
                  <>
                    <Cell span={[2, 2, 2]} key={index}>
                      <Inner>
                        <LabelMedium>{day}</LabelMedium>
                      </Inner>
                    </Cell>
                    <Cell span={[5, 3, 5]} key={index}>
                      <Inner>
                        <Combobox
                          disabled={!days.includes(day)}
                          size={DROPDOWN_SIZE.compact}
                          options={hourOptions}
                          value={startTime}
                          onChange={(nextValue) => {
                            setSchedule((prevSchedule) =>
                              prevSchedule.map((scheduleItem, i) =>
                                i === index
                                  ? {
                                      ...scheduleItem,
                                      startTime: nextValue,
                                    }
                                  : scheduleItem
                              )
                            );
                          }}
                          placeholder="Select start time"
                          mapOptionToString={(option) => option.label}
                        />
                      </Inner>
                    </Cell>
                    <Cell span={[5, 3, 5]}>
                      <Inner>
                        <Combobox
                          disabled={!days.includes(day)}
                          size={DROPDOWN_SIZE.compact}
                          options={hourOptions}
                          value={endTime}
                          onChange={(nextValue) => {
                            setSchedule((prevSchedule) =>
                              prevSchedule.map((scheduleItem, i) =>
                                i === index
                                  ? {
                                      ...scheduleItem,
                                      endTime: nextValue,
                                    }
                                  : scheduleItem
                              )
                            );
                          }}
                          placeholder="Select end time"
                          mapOptionToString={(option) => option.label}
                        />
                      </Inner>
                    </Cell>
                  </>
                ))}
              </Grid>
            </Outer>
          )}
        </div>
        <ButtonDock
          primaryAction={
            <Button
              onClick={() => {
                if (activeStep < 2) {
                  setActiveStep(activeStep + 1);
                } else {
                  saveSchedule();
                }
              }}
            >
              {activeStep === 2 ? "Submit" : "Next"}
            </Button>
          }
          secondaryActions={[
            <Button
              kind={KIND.secondary}
              key="first"
              disabled={activeStep === 0}
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Back
            </Button>,
          ]}
        />
      </Container>
    </FullHeightContainer>
  );
}
