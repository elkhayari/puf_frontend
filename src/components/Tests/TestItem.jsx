import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { AiTwotoneDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { Refresh } from '@mui/icons-material';
import { BASE_URL } from '../../config';

const TestItem = ({ test }) => {
  const [testHovered, setTestHovered] = useState(false);
  const [savingTest, setSavingTest] = useState(false);
  const [deleteDecision, setDeleteDecision] = useState(false);

  const navigate = useNavigate();

  const { id, title, testType, board, memory, temperature, voltage } = test;

  //window.location.reload();

  const deleteTest = (id) => {
    console.log('Delete Test', id);
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    };
    fetch(`${BASE_URL}api/tests/${id}`, requestOptions).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      navigate('/tests');
    });
  };

  const editTest = (id) => {
    console.log('Edit Test', id);
  };

  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-zoom-in"
      onMouseEnter={() => setTestHovered(true)}
      onMouseLeave={() => setTestHovered(false)}
      onClick={() => navigate(`/tests/test-detail/${id}`)}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {title}
      </th>
      <td className="text-left px-6 py-4">{testType}</td>
      <td className="px-6 py-4">{memory}</td>
      <td className="text-center px-6 py-3">{board}</td>
      <td className="px-6 py-4">{voltage}</td>
      <td className="inline-grid grid-cols-2 gap-4 px-1 py-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            editTest(id);
          }}
          className="bg-blue-200/30 p-1 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 opacity-75 hover:opacity-100 outline-none"
        >
          <CiEdit />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            deleteTest(id);
          }}
          className="bg-red-200/30 p-1 rounded-full w-8 h-8 flex items-center justify-center text-red-600 opacity-75 hover:opacity-100 outline-none"
        >
          <AiTwotoneDelete />
        </button>
      </td>
    </tr>
  );
};

export default TestItem;
