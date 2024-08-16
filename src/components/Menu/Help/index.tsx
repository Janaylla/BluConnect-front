import { Theme } from "@emotion/react";
import { Box, Modal, SxProps, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { routes } from "../../../router/router";

interface HelpProp {
  onClose: () => void;
  open: boolean;
}
const style: SxProps<Theme> = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100% - 20px)',
  maxWidth: '800px',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}



export function Help({ onClose, open }: HelpProp) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [tabs, setTabs] = useState<JSX.Element[]>([]);
  const [customTabPanel, setCustomTabPanel] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newTabs: JSX.Element[] = [];
    const newCustomTabPanel: JSX.Element[] = [];
    let index = 0;
    routes.forEach((route) => {
      route.routes.forEach((r) => {
        newTabs.push(<Tab
          label={r.label}
          id={`simple-tab-${index}`}
          aria-controls={`simple-tabpanel-${index}`}
        />)
        newCustomTabPanel.push(<CustomTabPanel value={value} index={index}>
          <Box
            height={'300px'}
            maxHeight={'calc(100vh - 300px)'}
            overflow={'auto'}
            display={'flex'}
            flexDirection={'column'}
            gap='10px'
            paddingX={'20px'}
          >
            {
              r.help.map((con, i) => <p>
                <b>{i + 1} {con.title}:</b> {con.text}
              </p>)
            }
          </Box>
        </CustomTabPanel>)
        index++;
      })
    })
    setCustomTabPanel(newCustomTabPanel);
    setTabs(newTabs)
  }, [value])

  return <>
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {tabs}
          </Tabs>
        </Box>
        {customTabPanel}
      </Box>
    </Modal>
  </>
}