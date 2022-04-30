import React from 'react';
import { Fragment } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import ListAppointmentTreatmentDetail from './ListAppointmentTreatmentDetail';

const TreatmentDetail = (props) => {
  const { data } = props;

  return (
    <Fragment>
      <Modal
        open={props.isOpen}
        onClose={props.closeModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        className="fixed  inset-0 z-50 flex items-center justify-center overflow-hidden font-nunito"
      >
        <Box className="h-[700px] w-[900px] overflow-y-auto rounded-lg bg-white shadow-lg">
          <div className="sticky inset-0 top-0  z-50 flex justify-center  border-b-2 border-blue-600    bg-white px-4 sm:px-6">
            <h3 className=" max-w-2xl  py-3 text-center text-base font-bold leading-normal text-gray-800 sm:text-lg md:text-xl lg:text-2xl">
              Danh sách lịch trình chi tiết
            </h3>
          </div>
          <div>
            <div className="mt-5 overscroll-contain border-slate-200">
              <div className="my-3 px-8">
                <ListAppointmentTreatmentDetail treatment={data} />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default TreatmentDetail;
