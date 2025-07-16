import React from 'react';

const dealers = [
  {
    city: 'LAHORE',
    entries: [
      { name: 'MIAN CAR A.C', address: '68-Mozang Road, Lahore', phone: '042-36301664 / 36315895' },
      { name: 'AHMED CAR A.C', address: 'C 427-Pak Block Allama Iqbal Town, Lahore', phone: '042-37805100 / 37806100' },
      { name: 'AHMED CAR A.C', address: '339/R, Johar Town, Lahore', phone: '042-35956300' },
      { name: 'COOL SUN CAR A.C', address: '23-B,Temple Road, Lahore', phone: '042-36302500/600' },
      { name: 'BASHIR CAR A.C', address: '57-Mozang Road, Lahore', phone: '042-36303225-26' },
      { name: 'LAHORE CAR A.C', address: '31-Ferozpur Road, Lahore', phone: '042-37585657' },
      { name: 'PAKISTAN CAR A.C', address: 'Peco Road Township, Lahore', phone: '0300-8885013' },
      { name: 'IRFAN SONS', address: 'Walton Road, Lahore', phone: '042-36651222' },
      { name: 'NASIR CAR A.C', address: 'Township Lahore', phone: '042-35155428' },
    ],
  },
  {
    city: 'ISLAMABAD/RAWALPINDI',
    entries: [
      { name: 'NEW EASTERN CAR A.C', address: '8-Chanab Market G-7/1, Islamabad', phone: '051-2202621' },
      { name: 'JAVAID SONS', address: 'Shop No.1,Block 70 I&T Centre, G-9/4,Islamabad', phone: '051-2260121' },
      { name: 'REHMAN REFRIGERATION', address: 'Opp.Naz Cinema , Refrigeration Street,#4, Beside MCB Ferozepura Murree Road, Rawalpindi', phone: '051-5540016' },
    ],
  },
  {
    city: 'KARACHI',
    entries: [
      { name: 'FAISAL CAR AIRCONDITIONING', address: '564-C Blcok 2 Khuhsal Road Off Tariq Road, P.E.C.H.S Karachi', phone: '021-34301330' },
    ],
  },
  {
    city: 'PESHAWAR',
    entries: [
      { name: 'SUZUKI TAYYAB MOTOR', address: 'Jamrod Road Peshawar', phone: '091-5840627' },
    ],
  },
  {
    city: 'MULTAN',
    entries: [
      { name: 'PUNJAB CAR A.C', address: '277,278 Shershah Road, Multan', phone: '061-4547515' },
    ],
  },
  {
    city: 'OKARA',
    entries: [
      { name: 'MUNAWAR CAR A.C', address: 'Chowk Depalpur  G.T Road, Okara', phone: '044-2552699 / 0300-6964055' },
    ],
  },
  {
    city: 'FAISALABAD',
    entries: [
      { name: 'NADEEM BROTHERS CAR A.C', address: 'People`s Colony,saleemi Chowk,Faisalabad', phone: '041-8726778' },
    ],
  },
  {
    city: 'SAILKOT',
    entries: [
      { name: 'ALLAH HOO CAR A.C CENTRE', address: 'Kashmir Road, Paka Gara Near Darbar Saieen Manna,Sialkot', phone: '052-4007126 / 0333-8725087' },
    ],
  },
  {
    city: 'BAHAWALAPUR',
    entries: [
      { name: 'BISMILLAH CAR A.C CENTRE', address: 'Dubai Chowk Ahmed Pur Road opp P.S.O Petrol Pump Bahawalpur.', phone: '0622-882634' },
    ],
  },
  {
    city: 'SAHIWAL',
    entries: [
      { name: 'SUZUKI ORIENTAL MOTORS', address: 'By Pass Chowk Opp. Daewoo Terminal Sahiwal', phone: '040-4463555' },
    ],
  },
  {
    city: 'GUJRAT',
    entries: [
      { name: 'ASHRAF CAR A.C', address: 'G.T Road Gujrat', phone: '053-3537460' },
    ],
  },
  {
    city: 'GUJRANWALA',
    entries: [
      { name: 'REHMAN CAR A.C', address: 'Kheali Sheikhopura Road, Near Al Hilal Foundry, Gujranwala', phone: '055-4444495' },
    ],
  },
];

const SubDealers = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-punjabac-brand mb-4">Sub Dealers of Punjab Car AC</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            A complete list of our efficient nationally tenticelized network of officially accredited Sub-Dealers is appended below to facilitate our valued clients.
          </p>
        </div>
        <div className="space-y-12">
          {dealers.map((group) => (
            <div key={group.city}>
              <h3 className="text-2xl font-semibold text-punjabac-brand mb-4 border-b border-gray-200 pb-2">{group.city}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Office Name</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Address</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Phone Numbers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.entries.map((dealer, idx) => (
                      <tr key={dealer.name + idx} className="even:bg-gray-50">
                        <td className="px-4 py-2 text-gray-900 whitespace-nowrap">{dealer.name}</td>
                        <td className="px-4 py-2 text-gray-700">{dealer.address}</td>
                        <td className="px-4 py-2 text-gray-700">{dealer.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubDealers; 