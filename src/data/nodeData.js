

const libraryList = {
  路由器:[
    {
      id: 'router01',
      name: 'AR201',
      // pic: require('./img/router.png')
      pic : new URL('./img/router-1.png',import.meta.url).href
    },
    {
      id: 'router02',
      name: 'AR1220',
      // pic: require('./img/router.png')
      pic : new URL('./img/router-1.png',import.meta.url).href
    },
    {
      id: 'router03',
      name: 'AR2220',
      // pic: require('./img/router.png')
      pic : new URL('./img/router-1.png',import.meta.url).href
    },
    {
      id: 'router04',
      name: 'AR2240',
      // pic: require('./img/router.png')
      pic : new URL('./img/router-1.png',import.meta.url).href
    },
    {
      id: 'router05',
      name: 'AR3260',
      // pic: require('./img/router.png')
      pic : new URL('./img/router-1.png',import.meta.url).href
    },
    {
      id: 'router06',
      name: 'NE40E',
      // pic: require('./img/router.png')
      pic : new URL('./img/router2.png',import.meta.url).href
    },
    {
      id: 'router07',
      name: 'NE5000E',
      // pic: require('./img/VOIP_router.png')
      pic : new URL('./img/router3.png',import.meta.url).href
    },
    {
      id: 'router08',
      name: 'NE9000',
      // pic: require('./img/VOIP_router.png')
      pic : new URL('./img/router4.png',import.meta.url).href
    },
    {
      id: 'router09',
      name: 'CX',
      // pic: require('./img/VOIP_router.png')
      pic : new URL('./img/router5.png',import.meta.url).href
    }
  ],
  交换机: [
    {
      id: 'switch01',
      name: 'S5700',
      // pic: require('./img/switch.png')
      pic : new URL('./img/switch1.png',import.meta.url).href

    },
    {
      id: 'switch02',
      name: 'S3700',
      // pic: require('./img/switch.png')
      pic : new URL('./img/switch2.png',import.meta.url).href

    },
    {
      id: 'switch03',
      name: 'CE6800',
      // pic: require('./img/switch.png')
      pic : new URL('./img/switch2.png',import.meta.url).href

    },
    {
      id: 'switch04',
      name: 'CE12800',
      // pic: require('./img/switch.png')
      pic : new URL('./img/switch3.png',import.meta.url).href

    }
  ],
  无线局域网: [
    {
      id: 'wireless01',
      name: 'AC6005',
      // pic: require('./img/host.jpg')
      pic : new URL('./img/wireless1.png',import.meta.url).href
    },
    {
      id: 'wireless02',
      name: 'AC6605',
      // pic: require('./img/host.jpg')
      pic : new URL('./img/wireless1.png',import.meta.url).href
    },
    {
      id: 'wireless03',
      name: 'AP2050',
      // pic: require('./img/host.jpg')
      pic : new URL('./img/wireless2.png',import.meta.url).href
    },
    {
      id: 'wireless04',
      name: 'R250D',
      // pic: require('./img/host.jpg')
      pic : new URL('./img/wireless2.png',import.meta.url).href
    }
  ],
  防火墙: [
    {
      id: 'firewall01',
      name: 'USG5500',
      // pic: require('./img/host.jpg')
      pic : new URL('./img/firewall1.png',import.meta.url).href
    },
    {
      id: 'firewall02',
      name: 'USG6000V',
      // pic: require('./img/host.jpg')
      pic : new URL('./img/firewall1.png',import.meta.url).href
    }
  ],

  主机: [

    {
      id: 'pc01',
      name: 'PC',
      // pic: require('./img/host.jpg')
      pic : new URL('./img/pc6.png',import.meta.url).href
    },
    {
      id: 'pc02',
      name: 'MCS',
      // pic: require('./img/host.jpg')
      pic : new URL('./img/pc2.png',import.meta.url).href
    },
    {
      id: 'pc03',
      name: 'Client',
      // pic: require('./img/host.jpg')
      pic : new URL('./img/pc3.png',import.meta.url).href
    },
    {
      id: 'pc04',
      name: 'Server',
      // pic: require('./img/host.jpg')
      pic : new URL('./img/pc4.png',import.meta.url).href
    },
    {
      id: 'pc05',
      name: 'STA',
      // pic: require('./img/host.jpg')
      pic : new URL('./img/pc5.png',import.meta.url).href
    },
    {
      id: 'pc06',
      name: 'Cellphone',
      // pic: require('./img/host.jpg')
      pic : new URL('./img/pc1.png',import.meta.url).href
    }
  ],
  其他设备: [
    {
      id: 'other01',
      name: 'Cloud',
      // pic: require('./img/server.png')
      pic : new URL('./img/cloud1.png',import.meta.url).href
    },
    {
      id: 'other02',
      name: 'FRSW',
      // pic: require('./img/server.png')
      pic : new URL('./img/cloud2.png',import.meta.url).href
    },
    {
      id: 'other03',
      name: 'HUB',
      // pic: require('./img/server.png')
      pic : new URL('./img/cloud3.png',import.meta.url).href
    }
  ]
}
export default libraryList
