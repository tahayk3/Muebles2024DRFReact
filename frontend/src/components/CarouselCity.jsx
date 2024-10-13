import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/autoplay"; // Importa el estilo de autoplay si es necesario

import "./CarouselCity.css";

// Import required modules
import { EffectCards, Autoplay } from "swiper/modules";

const CarouselCity = () => {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      loop={true}
      slidesPerView={1}  // Reduce el número de slides que se muestran a la vez
      slidesPerGroup={1} // Cuántos slides avanzan al mismo tiempo
      loopAdditionalSlides={22} // Mantén esto si tienes suficientes slides
      autoplay={{
        delay: 400,
        disableOnInteraction: false,
      }}
      modules={[EffectCards, Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Bandera_de_Alta_Verapaz.svg/68px-Bandera_de_Alta_Verapaz.svg.png"
          alt="Alta Verapaz 1"
        />
        <span>Alta Verapaz</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Flag_of_Baja_Verapaz%2C_Guatemala.png/68px-Flag_of_Baja_Verapaz%2C_Guatemala.png"
          alt="Baja Verapaz 2"
        />
        <span>Baja Verapaz</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Vlagchimaltenango.gif/68px-Vlagchimaltenango.gif"
          alt="Chimaltenango 3"
        />
        <span>Chimaltenango</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Bandera_de_Chiquimula.png/66px-Bandera_de_Chiquimula.png"
          alt="Chiquimula 4"
        />
        <span>Chiquimula</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Flag_of_El_Progresso.svg/68px-Flag_of_El_Progresso.svg.png"
          alt="El Progreso 5"
        />
        <span>El Progreso</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flag_of_Escuintla.svg/68px-Flag_of_Escuintla.svg.png"
          alt="Escuintla 6"
        />
        <span>Escuintla</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Bandera_del_Departamento_Guatemala.svg/68px-Bandera_del_Departamento_Guatemala.svg.png"
          alt="Departamento de Guatemala 7"
        />
        <span>Departamento de Guatemala</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Flag_Huehuetenango.png/68px-Flag_Huehuetenango.png"
          alt="Huehuetenango 8"
        />
        <span>Huehuetenango</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Flag_of_Izabal_Department.gif/68px-Flag_of_Izabal_Department.gif"
          alt="Izabal 9"
        />
        <span>Izabal</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_Jalapa_Department%2C_Guatemala.svg/68px-Flag_of_Jalapa_Department%2C_Guatemala.svg.png"
          alt="Jalapa 10"
        />
        <span>Jalapa</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Vlagjutiapa.gif/68px-Vlagjutiapa.gif"
          alt="Jutiapa 11"
        />
        <span>Jutiapa</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Bandera_del_Departamento_El_Pet%C3%A9n.png/68px-Bandera_del_Departamento_El_Pet%C3%A9n.png"
          alt="Petén 12"
        />
        <span>Petén</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Vlagquetzaltenango.gif/68px-Vlagquetzaltenango.gif"
          alt="Quetzaltenango 13"
        />
        <span>Quetzaltenango</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/..El_Quich%C3%A9_Flag%28GUATEMALA%29.png/68px-..El_Quich%C3%A9_Flag%28GUATEMALA%29.png"
          alt="Quiché 14"
        />
        <span>Quiché</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Vlagretalhuleu.gif/68px-Vlagretalhuleu.gif"
          alt="Retalhuleu 15"
        />
        <span>Retalhuleu</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Bandera_de_Sacatep%C3%A9quez.svg/68px-Bandera_de_Sacatep%C3%A9quez.svg.png"
          alt="Sacatepéquez 16"
        />
        <span>Sacatepéquez</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Vlagsanmarcos.gif/68px-Vlagsanmarcos.gif"
          alt="San Marcos 17"
        />
        <span>San Marcos</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Flag_of_Santa_Rosa_Department.GIF/68px-Flag_of_Santa_Rosa_Department.GIF"
          alt="Santa Rosa 18"
        />
        <span>Santa Rosa</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Solol%C3%A1_Department.svg/68px-Flag_of_Solol%C3%A1_Department.svg.png"
          alt="Sololá 19"
        />
        <span>Sololá</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/..Suchitep%C3%A9quez_Flag%28GUATEMALA%29.png/68px-..Suchitep%C3%A9quez_Flag%28GUATEMALA%29.png"
          alt="Suchitepéquez 20"
        />
        <span>Suchitepéquez</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bandera_Totonicap%C3%A1n.svg/68px-Bandera_Totonicap%C3%A1n.svg.png"
          alt="Totonicapán 21"
        />
        <span>Totonicapán</span>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/..Zacapa_Flag%28GUATEMALA%29.png/68px-..Zacapa_Flag%28GUATEMALA%29.png"
          alt="Zacapa 22"
        />
        <span>Zacapa</span>
      </SwiperSlide>
    </Swiper>
  );
};

export default CarouselCity;
