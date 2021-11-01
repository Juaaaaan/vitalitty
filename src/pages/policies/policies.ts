import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PoliciesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-policies',
  templateUrl: 'policies.html',
})
export class PoliciesPage implements OnInit {

  public title_first: string = '';
  public description_first: string = '';
  public descritpion_2_first: string = '';

  public title_second: string = '';
  public description_second: string = '';

  public title_third: string = '';
  public description_third: string = '';

  public title_fourth: string = '';
  public description_fourth: string = '';

  public title_fifth: string = '';
  public description_fifth: string = '';

  public title_sixth: string = '';
  public description_sixth: string = '';

  public title_seventh: string = '';
  public description_seventh: string = '';

  public title_eigths: string = '';
  public description_eigths: string = '';
  
  public title_nineth: string = '';
  public description_nineth: string = '';

  public title_tenth: string = '';
  public description_tenth: string = '';

  public title_eleventh: string = '';
  public description_eleventh: string = '';

  public title_twelveth: string = '';
  public description_twelveth: string = '';

  public title_thirdthteen: string = '';
  public description_thirdthteen: string = '';

  public title_fourthteen: string = '';
  public description_fourthteen: string = '';

  public title_fifthteen: string = '';
  public description_fifthteen: string = '';


  public last_title: string = '';
  public last_description: string = '';
  public last_description_2: string = '';
  public last_description_3: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoliciesPage');
  }

  ngOnInit() : void {
    this.title_first = 'Responsable, Finalidad, Legitimación, Destinatarios, Derechos';
    this.description_first = 'Jesús Arsenio García García (Vitalitty).';
    this.descritpion_2_first = 'Prestación de servicios online Gestión de usuarios web Comunicaciones comerciales relacionadas con nuestros servicios. Consentimiento expreso e interés legitimo. No se ceden datos a terceros, salvo obligación legal. Acceder, rectificar y suprimir los datos, así́ como otros derechos, como se explica en la información adicional.';

    this.title_second = '¿Quién es el responsable del tratamiento de sus datos personales?';
    this.description_second = 'Identidad: Jesús Arsenio García García (VITALITTY). Domicilio social: Calle Mayor Alta, 40. Perales de Tajuña (28540). D.N.I: 50896803-B. Email: info@vitalitty.es. VITALITTY ha designado un Delegado de Protección de Datos o una persona de contacto interna dentro de su organización. Si deseas hacer una consulta en relación al tratamiento de tus datos personales, puedes ponerte en contacto con él mediante el correo info@vitality.es.'

    this.title_third = '¿Qué datos personales recopilamos?'
    this.description_third = 'Los datos personales que el usuario puede llegar a proporcionar: Nombre, dirección y fecha de nacimiento. Número de teléfono y dirección de correo electrónico. Ubicación. Datos físicos: peso, altura, medidas, gustos alimenticios, intolerancias, alergias Informes clínicos Dirección IP, fecha y hora en la que has accedido a nuestros servicios, navegador de internet que uses y datos sobre el sistema operativo del dispositivo. Cualquier otra información o datos que decidas compartir con nosotros. En algunos casos, es obligatoria la cumplimentación del formulario de registro para acceder y disfrutar de determinados servicios ofrecidos en la web; asimismo, no facilitar los datos personales solicitados o el no aceptar la presente política de protección de datos supone la imposibilidad de suscribirse, registrarse o participar en cualquiera de las promociones en las que se soliciten datos carácter personal.'

    this.title_fourth = '¿Por qué y para qué tratamos tus datos?';
    this.description_fourth = 'En VITALITTY tratamos la información que nos facilitan las personas interesadas con las siguientes finalidades. Gestionar pedidos o contratar alguno de nuestros servicios, ya sea online o en las tiendas físicas. Gestionar el envío de la información que nos soliciten. Desarrollar acciones comerciales y realizar el mantenimiento y gestión de la relación con el usuario, así como la gestión de los servicios ofrecidos a través del sitio web y las labores de información, pudiendo realizar valoraciones automáticas, obtención de perfiles y labores de segmentación de los clientes con el objeto de personalizar el trato conforme a sus características y necesidades y mejorar la experiencia en línea del cliente. Desarrollar y gestionar los concursos, sorteos u otras actividades promocionales que se puedan organizar. En algunos casos será necesario facilitar información a las Autoridades o terceras empresas por motivos de auditoría, así como manejar datos personales de facturas, contratos y documentos para responder a reclamaciones de clientes o de las Administraciones Públicas Informamos que los datos personales que se obtengan como consecuencia de tu registro como usuario formarán parte del Registro de Actividades y operaciones de Tratamiento (RAT), que se actualizará periódicamente de acuerdo con lo establecido en el RGPD.';

    this.title_fifth = '¿Cuál es la legitimación para el tratamiento de tus datos?';
    this.description_fifth = 'El tratamiento de tus datos puede fundamentarse en las siguientes bases legales: Consentimiento del interesado para la contratación de servicios y productos, para los formularios de contacto, las solicitudes de información o alta en newsletters. Interés legítimo para el tratamiento de datos de nuestros clientes en acciones de marketing directo y consentimiento expreso del interesado para todo lo relativo a las valoraciones automáticas y elaboración de perfiles. Cumplimiento de obligaciones legales para prevención del fraude, comunicación con Autoridades públicas y reclamaciones de terceros.';

    this.title_sixth = '¿Cuánto tiempo conservamos tus datos?';
    this.description_sixth = 'El tratamiento de los datos con las finalidades descritas se mantendrá durante el tiempo necesario para cumplir con la finalidad de su recogida (por ejemplo, mientras dure la relación comercial), así como para el cumplimiento de las obligaciones legales que se deriven del tratamiento de los datos.';

    this.title_seventh = '¿A qué destinatarios se comunican tus datos?';
    this.description_seventh = 'En algunos casos, solo cuando sea necesario, VITALITTY proporcionará datos de los usuarios a terceros. Sin embargo, nunca se venderán los datos a terceros. Los proveedores de servicios externos (por ejemplo, proveedores de pago o empresas de reparto) con los que VITALITTY trabaje pueden usar los datos para proporcionar los servicios correspondientes, sin embargo, no usarán dicha información para fines propios o para cesión a terceros. VITALITTY procura garantizar la seguridad de los datos personales cuando se envían fuera de la empresa y se asegura que los terceros proveedores de servicio respetan la confidencialidad y cuentan con las medidas adecuadas para proteger los datos personales. Dichos terceros tienen la obligación de garantizar que la información se trata conforme con la normativa de privacidad de datos. En algunos casos, la ley puede exigir que se revelen datos personales a organismos públicos u otras partes, solo se revelará lo estrictamente necesario para el cumplimiento de dichas obligaciones legales. Los datos personales obtenidos también podrán ser compartidos con otras empresas del grupo.';

    this.title_eigths = '¿Dónde se almacenan tus datos?';
    this.description_eigths = 'Con carácter general, los datos se almacenan dentro de la UE. Los datos que se envíen a terceros que no pertenezcan a la UE, nos aseguraremos que ofrezcan un nivel de protección suficiente, ya sea porque cuentan con Normas Corporativas Vinculantes (BCR) o porque se hayan adherido al “Privacy Shield”.'

    this.title_nineth = '¿Qué derechos te asisten y cómo puedes ejercerlos?';
    this.description_nineth = 'Puedes dirigir tus comunicaciones y ejercitar tus derechos mediante una petición en el siguiente correo electrónico: info@vitalitty.es. En virtud de lo que establece el RGPD puedes solicitar derecho de: Acceso: puedes pedir información de aquellos datos personales que dispongamos acerca de ti. Rectificación: puedes comunicar cualquier cambio en tus datos personales. Derecho de supresión y al olvido: puedes solicitar la eliminación previo bloqueo de los datos personales. Limitación al tratamiento: supone la restricción del tratamiento de los datos personales. Oposición: puedes retirar el consentimiento del tratamiento de los datos, oponiéndose a que se sigan tratando. Portabilidad: en algunos casos, puedes pedir una copia de los datos personales en un formato estructurado, de uso común y lectura mecánica para su transmisión a otro responsable. Derecho a no ser objeto de decisiones individualizadas: puedes solicitar que no se tomen decisiones que se basen únicamente en el tratamiento automatizado, incluyendo la elaboración de perfiles, que produzca efectos jurídicos o afecte significativamente al interesado. En algunos casos, se podrá rechazar la solicitud si solicitas que se eliminen datos necesarios para el cumplimiento de obligaciones legales. Asimismo, si tienes alguna queja sobre el tratamiento de los datos puedes presentar una reclamación a la autoridad de protección de datos.'
    
    this.title_tenth = '¿Quién es el responsable de la exactitud y veracidad de los datos facilitados?';
    this.description_tenth = 'El usuario es el único responsable de la veracidad y corrección de los datos incluidos, exonerando a VITALITTY de cualquier responsabilidad al respecto. Los usuarios garantizan y responden, en cualquier caso, de la exactitud, vigencia y autenticidad de los datos personales facilitados, y se comprometen a mantenerlos debidamente actualizados. El usuario acepta proporcionar información completa y correcta en el formulario de registro o suscripción. VITALITTY se reserva el derecho de: Finalizar los servicios contratados que se hubiera celebrado con los usuarios, en caso que los datos que haya facilitado sean falsos, incompletos, inexactos o no estén actualizados. No responde de la veracidad de las informaciones que no sean de elaboración propia y de las que se indique otra fuente, por lo que tampoco asume responsabilidad alguna en cuanto a hipotéticos perjuicios que pudieran originarse por el uso de dicha información. Actualizar, modificar o eliminar la información contenida en sus páginas web pudiendo incluso limitar o no permitir el acceso a dicha información. Se exonera a VITALITTY de responsabilidad ante cualquier daño o perjuicio que pudiera sufrir el usuario como consecuencia de errores, defectos u omisiones, en la información facilitada por VITALITTY siempre que proceda de fuentes ajenas a la misma. Asimismo, el usuario certifica que es mayor de 14 años y que posee la capacidad legal necesaria para la prestación del consentimiento en cuanto al tratamiento de sus datos de carácter personal.';

    this.title_eleventh = '¿Cómo tratamos los datos personales de los menores de edad?';
    this.description_eleventh = 'Algunos de nuestros servicios van dirigidos a menores de edad. En el supuesto de que alguno de ellos se dirija a menores de catorce años, de conformidad con el artículo 8 del RGPD y el artículo 7 de la LO3/2018, de 5 de diciembre (LOPDGDD), FISIOPOU exigirá el consentimiento válido, libre, inequívoco, específico e informado de sus tutores legales para tratar los datos personales de los menores. En este caso, se exigirá el DNI u otra forma de identificación de quien preste el consentimiento. En el caso de mayores de catorce años podrá procederse al tratamiento de los datos con el consentimiento del usuario, exceptuando aquellos casos en los que la Ley exija la asistencia de los titulares de la patria potestad o tutela.';

    this.title_twelveth = '¿Qué medidas de seguridad aplicamos para proteger tus datos personales?';
    this.description_twelveth = 'VITALITTY ha adoptado los niveles de seguridad de protección de los Datos Personales legalmente requeridos, y procura instalar aquellos otros medios y medidas técnicas adicionales a su alcance para evitar la pérdida, mal uso, alteración, acceso no autorizado y robo de los Datos Personales facilitados a VITALITTY. VITALITTY no es responsable de hipotéticos daños o perjuicios que se pudieran derivar de interferencias, omisiones, interrupciones, virus informáticos, averías telefónicas o desconexiones en el funcionamiento operativo de este sistema electrónico, motivadas por causas ajenas a VITALITTY; de retrasos o bloqueos en el uso del presente sistema electrónico causados por deficiencias o sobrecargas de líneas telefónicas o sobrecargas en el Centro de Procesos de Datos, en el sistema de Internet o en otros sistemas electrónicos, así como de daños que puedan ser causados por terceras personas mediante intromisiones ilegítimas fuera del control de VITALITTY. Ello, no obstante, el usuario debe ser consciente de que las medidas de seguridad en Internet no son inexpugnables.';

    this.title_thirdthteen = 'Enlaces a otros sitios web';
    this.description_thirdthteen = 'En el sitio web https://vitalitty.es/ puede haber enlaces a otras páginas web. Al clicar en uno de estos enlaces y acceder a un sitio web externo, la visita estará sujeta a la política de privacidad de dicho sitio web, quedando VITALITTY desvinculada de cualquier tipode responsabilidad acerca de su política de privacidad.';

    this.title_fourthteen = '¿Cómo utilizamos las cookies?';
    this.description_fourthteen = 'El sitio web de VITALITTY utiliza cookies, a los efectos de optimizar y personalizar su navegación por el mismo. Las cookies son ficheros físicos de información que se alojan en el propio terminal del usuario, la información recogida mediante las cookies sirve para facilitar la navegación del usuario por el portal y optimizar la experiencia de navegación. Los datos recopilados mediante las cookies pueden ser compartidos con los creadores de las mismas, pero en ningún caso la información obtenida por las mismas será asociada a datos personales ni a datos que puedan identificar al usuario.Si el usuario no desea que se instalen cookies en su disco duro, tiene la posibilidad de configurar el navegador.';
    
    this.title_fifthteen = '¿Puede modificarse la política de privacidad?'
    this.description_fifthteen = 'Esta política de privacidad puede modificarse. Te recomendamos que revises la política de privacidad con cierta periodicidad.'
    
    this.last_title = 'Información adicional';
    this.last_description = 'En VITALITTY trabajamos para ofrecerte a través de nuestros productos y servicios la  mejor  experiencia  posible.  En  algunos  casos,  es  necesario  recabar  información  para  conseguirlo.  Nos  importa  tu  privacidad  y  creemos  que  debemos  ser  transparentes  al respecto.'
    this.last_description_2 = 'Por  ello,  y  a  efectos  de  lo  previsto  en  el  REGLAMENTO  (UE)  2016/679  DEL PARLAMENTO  EUROPEO  Y  DEL  CONSEJO  de  27  de  abril  de  2016  (en  adelante, “RGPD”) relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales  y a la libre circulación de estos datos,  y la LEY 34/2002, de 11 de julio,  de  Servicios  de  la  Sociedad  de  la  información  y  de  comercio  electrónico  (en adelante, “LSSI”), VITALITT informa al usuario que, como responsable del tratamiento, incorporará  los  datos  de  carácter  personal  facilitados  por  los  usuarios  en  un  fichero automatizado. Entendemos que tus datos te pertenecen. Por tanto, si decides no autorizarnos a procesarlos puedes solicitarnos que dejemos de tratarlos.'
    this.last_description_3 = 'Nuestro compromiso empieza por explicarte lo siguiente. Se recogen tus datos para que la experiencia de usuario mejore, atendiendo a tus intereses y necesidades. Somos transparentes en relación a los datos que obtenemos acerca de ti y la razón por la que lo hacemos. Nuestra  intención  es  ofrecerte  la  mejor  experiencia  posible.  Por  ello,  cuando vayamos  a  usar  tu  información  personal  lo  haremos  siempre  cumpliendo  la normativa, y cuando sea necesario, solicitaremos tu consentimiento. Nuestra prioridad consiste en garantizar tu seguridad y tratar tus datos de acuerdo con la normativa europea. '

  }

}
