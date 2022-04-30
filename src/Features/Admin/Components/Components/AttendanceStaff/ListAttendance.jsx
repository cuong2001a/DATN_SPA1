import React from 'react';
import { Dialog } from '@headlessui/react';
import SwitchAttendance from './SwitchAttendance';
import moment from 'moment';
import clsx from 'clsx';
import styles from './Style.module.css';
import ButtonComponent from '../Button/Button';

const ListAttendance = (props) => {
  return (
    <React.Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            opacity: 0.3,
            backgroundColor: 'black'
          }}
        ></div>
        <main className="z-50 w-4/5 rounded-md bg-gradient-to-b from-sky-400 to-sky-200 px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-4">
            <p
              tabIndex="0"
              className="text-base font-bold leading-normal text-gray-800 focus:outline-none sm:text-lg md:text-xl lg:text-2xl"
            >
              Danh sách nhân viên
            </p>
            <ButtonComponent mes="Trở lại" callBack={props.closeModal} color="bg-indigo-400" />
          </div>
          <table
            className={clsx(
              styles['table-scroll'],
              styles['small-first-col'],
              'min-w-full leading-normal'
            )}
          >
            <thead>
              <tr>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <div className="ml-5"></div>
                </th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <div className="ml-5">#</div>
                </th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Tên nhân viên
                </th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Điểm danh
                </th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  thời gian
                </th>
              </tr>
            </thead>
            <tbody className={clsx(styles['body-half-screen'])}>
              {props.data &&
                props.data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm"></td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <div className="flex items-center justify-center">
                          <p className="whitespace-no-wrap text-center text-gray-900">
                            {index + 1}{' '}
                          </p>
                        </div>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap text-gray-900">{item.user_id.name}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <SwitchAttendance data={item} />
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                          <span
                            aria-hidden
                            className="absolute inset-0 rounded bg-green-200 opacity-50"
                          ></span>
                          <span className="relative">{moment().format('DD-MM-YYYY')}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </main>
      </Dialog>
    </React.Fragment>
  );
};

export default ListAttendance;
