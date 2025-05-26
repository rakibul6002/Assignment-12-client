import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../provider/Auth/AuthProvider';

export default function PaymentHistory() {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    if (!user?.email) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://your-api-url.com/payments?email=${user.email}`);
      if (!res.ok) throw new Error('Failed to fetch payment history');
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Payment History</h1>

      {loading && <p>Loading payment history...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {payments.length === 0 ? (
            <div className="text-center text-gray-600 font-medium py-8">
              You haven't made any payments yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Transaction ID</th>
                    <th className="border px-4 py-2 text-left">Amount</th>
                    <th className="border px-4 py-2 text-left">Date</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id || payment.transactionId} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{payment.transactionId}</td>
                      <td className="border px-4 py-2">${payment.amount.toFixed(2)}</td>
                      <td className="border px-4 py-2">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2 capitalize text-green-600 font-semibold">
                        {payment.status || 'Paid'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
