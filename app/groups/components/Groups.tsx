"use client";

import { ChannelHeaderPage } from "@/app/channels/components/ChannelHeader";
import { GroupsContext } from "@/hooks/context/groups-context";
import { UserContext } from "@/hooks/context/user-context";
import { GroupsEntity } from "@/hooks/entities/messages.entities";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Container,
  Divider,
  LinearProgress,
  Stack,
  Tab,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { GroupsListPage } from "./GroupsList";

export default function Groups() {
  const [user] = useContext(UserContext);
  const [groups] = useContext(GroupsContext);
  const [value, setValue] = useState<string>("3");
  const [, setSelectedGroup] = useState<GroupsEntity | null>(null);
  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth="xs" style={{ padding: 0 }} sx={{ mb: 5, mt: 2 }}>
        <ChannelHeaderPage user={user} />
        <Divider sx={{ mt: 1 }} />
        <TabContext value={value}>
          <Stack direction="row" spacing={1}>
            <TabList onChange={handleTabChange}>
              <Tab
                label="Chats "
                value="2"
                onClick={() => router.push("/channels")}
              />
              <Tab label="Groups " value="3" />
            </TabList>
          </Stack>
          <TabPanel value="3" sx={{ padding: 0 }}>
            {groups.length === 0 ? (
              <Stack
                alignContent="center"
                alignItems="center"
                justifyContent="center"
                sx={{ height: "100vh" }}
                overflow="hidden"
              >
                <Alert severity="warning" variant="filled">
                  <AlertTitle>WARNING</AlertTitle>
                </Alert>
                <Stack
                  sx={{ width: "100%", color: "grey.500" }}
                  spacing={2}
                  p={5}
                >
                  <LinearProgress color="warning" />
                </Stack>
              </Stack>
            ) : (
              <GroupsListPage
                setSelectedGroup={setSelectedGroup}
                groups={groups}
              />
            )}
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
}
