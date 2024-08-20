//payment tsx

import React, { useEffect, useState } from 'react';
import { useGetPaymentsQuery, useCreatePaymentMutation, useUpdatePaymentMutation, useDeletePaymentMutation } from './PaymentsApi';
import { Toaster, toast } from 'sonner';

export interface TPayment {
  payment_id: number;
  booking_id: number;
  amount: number;
  payment_status: string;
  payment_date: string;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
}

const Payments: React.FC = () => {
  const { data, isLoading, isSuccess } = useGetPaymentsQuery();
  // const [] = useState <any>()
  useEffect(() => {
    if (data && isSuccess ) {
      console.log(data)
    }
  } ,[data, isSuccess])
  const [createPayment] = useCreatePaymentMutation();
  const [updatePayment] = useUpdatePaymentMutation();
  const [deletePayment, { data: deleteMsg }] = useDeletePaymentMutation();

  const [newPayment, setNewPayment] = useState<Partial<TPayment>>({
    booking_id: 0,
    amount: 0,
    payment_status: '',
    payment_date: '',
    payment_method: '',
    transaction_id: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPayment({
      ...newPayment,
      [name]: value,
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createPayment(newPayment);
    setNewPayment({
      booking_id: 0,
      amount: 0,
      payment_status: '',
      payment_date: '',
      payment_method: '',
      transaction_id: '',
    });
  };

  const handleUpdate = (payment_id: number) => {
    const updatePaymentData = {
      payment_status: 'updated',
    };
    updatePayment({ payment_id, ...updatePaymentData });
  };

  const handleDelete = async (payment_id: number) => {
    await deletePayment(payment_id);
    toast.success(deleteMsg?.msg || 'Payment deleted successfully');
  };

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="overflow-x-auto bg-gray-800 text-white  p-4 h-screen overflow-y-auto">
        <h1 className="text-xl my-4">Payments</h1>
        <form onSubmit={handleCreate} className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            {/* <input
              type="number"
              name="booking_id"
              value={newPayment.booking_id}
              onChange={handleInputChange}
              placeholder="Booking ID"
              className="input input-bordered w-full"
            /> */}
            <input
              type="number"
              name="amount"
              value={newPayment.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="payment_status"
              value={newPayment.payment_status}
              onChange={handleInputChange}
              placeholder="Payment Status"
              className="input input-bordered w-full"
            />
            <input
              type="date"
              name="payment_date"
              value={newPayment.payment_date}
              onChange={handleInputChange}
              placeholder="Payment Date"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="payment_method"
              value={newPayment.payment_method}
              onChange={handleInputChange}
              placeholder="Payment Method"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="transaction_id"
              value={newPayment.transaction_id}
              onChange={handleInputChange}
              placeholder="Transaction ID"
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-sm btn-outline btn-success mt-4">Add Payment</button>
        </form>
        <table className="table table-xs">
          <thead>
            <tr>
              <th className="text-white">Payment ID</th>
              <th className="text-white">Booking ID</th>
              <th className="text-white">Amount</th>
              <th className="text-white">Payment Status</th>
              <th className="text-white">Payment Date</th>
              <th className="text-white">Payment Method</th>
              <th className="text-white">Transaction ID</th>
              <th className="text-white">Created At</th>
              <th className="text-white">Updated At</th>
              <th className="text-white">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={10}>Loading...</td></tr>
            ) : (
              data && data.map((payment: TPayment, index: number) => (
                <tr key={index}>
                  <th>{payment.payment_id}</th>
                  <td>{payment.booking_id}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.payment_status}</td>
                  <td>{payment.payment_date}</td>
                  <td>{payment.payment_method}</td>
                  <td>{payment.transaction_id}</td>
                  <td>{payment.created_at}</td>
                  <td>{payment.updated_at}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-outline btn-info" onClick={() => handleUpdate(payment.payment_id)}>Update</button>
                    <button className="btn btn-sm btn-outline btn-warning" onClick={() => handleDelete(payment.payment_id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr><td colSpan={10}>{data ? `${data.length} records` : '0 records'}</td></tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Payments;