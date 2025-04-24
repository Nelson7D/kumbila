import { Check } from 'lucide-react';

const SpaceDetailInfo = ({ description, amenities, extras }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Sobre o Espaço</h2>
      <p className="text-gray-700 mb-6">{description}</p>
      
      <h3 className="text-xl font-semibold mb-3">Comodidades</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center">
            <Check size={16} className="text-primary mr-2" />
            <span>{amenity}</span>
          </div>
        ))}
      </div>
      
      <h3 className="text-xl font-semibold mb-3">Serviços Extras Disponíveis</h3>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {extras.map((extra, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span>{extra.name}</span>
              <span className="font-medium">{extra.price.toLocaleString('pt-AO')} Kz</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpaceDetailInfo;