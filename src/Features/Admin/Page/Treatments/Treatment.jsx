import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import { useState, useEffect } from 'react';
import CreateTreatment from './CreateTreatment';
import ListTreatment from './ListTreatment';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Treatment = () => {
  const [createAppointment, setCreateAppointment] = useState(false);
  const closeCreateAppointment = () => {
    setCreateAppointment(false);
  };
  const treatments = useSelector((state) => state.treatment.current);

  const [dataTreat, setDataTreat] = useState(
    treatments.filter((item) => item.treatment_id.active === true)
  );

  const [typeDialog, setTypeDialog] = useState(0);
  const [itemEdit, setItemEdit] = useState('');

  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  useEffect(() => {
    setDataTreat(
      treatments.filter((item) => item.treatment_id.active === (tab === 0 ? true : false))
    );
  }, [treatments, tab]);
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Quản lý liệu trình</h3>
        <div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={'Hoạt động'} {...a11yProps('true')} />
              <Tab label={'vô hiệu hóa'} {...a11yProps('false')} />
            </Tabs>
          </Box>
        </div>
        <ButtonComponent
          mes="Thêm mới"
          callBack={() => {
            setCreateAppointment(true);
            setTypeDialog(0);
          }}
        />
      </div>
      {dataTreat.length === 0 ? (
        <div>
          <div className="flex h-screen items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-900">Không có dữ liệu</h1>
          </div>
        </div>
      ) : (
        <ListTreatment
          onDialog={setCreateAppointment}
          onSetType={setTypeDialog}
          onSetItemEdit={setItemEdit}
          treatments={dataTreat}
        />
      )}

      <CreateTreatment
        isOpen={createAppointment}
        setIsOpen={setCreateAppointment}
        closeModal={closeCreateAppointment}
        typeDialog={typeDialog}
        itemEdit={itemEdit}
      />
    </div>
  );
};

export default Treatment;
