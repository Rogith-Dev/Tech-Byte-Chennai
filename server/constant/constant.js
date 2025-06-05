'use strict';

module.exports.PCComponentTypes = {
    Processor: {
        AMD_R3_3200G: {
            title: 'AMD Ryzen 3 3200G with Radeon 8 Graphics (YD320GC5FHBOX)',
            value: 'AMd Ryzen 3 3200G',
            price: 5850,
            originalPrice: 13500,
            image: 'assets/images/amd-ryzen3-3200g.jpg',
            count: 1,
            type: 'cpu'
        },
        AMD_R5_3500G: {
            title: 'Ryzen 5 3400G Processor With Radeon Graphics (YD340GC5FHBOX)',
            value: 'AMd Ryzen 5 3400G',
            price: 7000,
            originalPrice: 22000,
            image: 'assets/images/amd-ryzen5-3400g.jpg',
            count: 1,
            type: 'cpu'
        },
        AMD_R5_350d0G: {
            title: 'Ryzen 5 3400G Processor With Radeon Graphics (YD340GC5FHBOX)',
            value: 'AMd Ryzen 5 3400G',
            price: 7000,
            originalPrice: 22000,
            image: 'assets/images/amd-ryzen5-3400g.jpg',
            count: 1,
            type: 'cpu'
        },
        AMD_R5_3520d0G: {
            title: 'Ryzen 5 3400G Processor With Radeon Graphics (YD340GC5FHBOX)',
            value: 'AMd Ryzen 5 3400G',
            price: 7000,
            originalPrice: 22000,
            image: 'assets/images/amd-ryzen5-3400g.jpg',
            count: 1,
            type: 'cpu'
        },
        AMD_R5_3503d0G: {
            title: 'Ryzen 5 3400G Processor With Radeon Graphics (YD340GC5FHBOX)',
            value: 'AMd Ryzen 5 3400G',
            price: 7000,
            originalPrice: 22000,
            image: 'assets/images/amd-ryzen5-3400g.jpg',
            count: 1,
            type: 'cpu'
        },
        AMD_R5_3502dd0G: {
            title: 'Ryzen 5 3400G Processor With Radeon Graphics (YD340GC5FHBOX)',
            value: 'AMd Ryzen 5 3400G',
            price: 7000,
            originalPrice: 22000,
            image: 'assets/images/amd-ryzen5-3400g.jpg',
            count: 1,
            type: 'cpu'
        },
    },
    Motherboard: {
        GB_A520M: {
            title: 'Gigabyte A520M K V2 Amd Am4 Micro Atx Motherboard (A520M K V2)',
            price: 7000,
            originalPrice: 3900,
            image: 'assets/images/motherboard/Gigabyte-A520M-K-V2-Motherboard-1-1.jpg',
            count: 1,
            type: 'motherboard'
        },
        MSI_A520M_A_PRO: {
            title: 'MSI A520M-A Pro Motherboard',
            price: 7200,
            originalPrice: 3950,
            image: 'assets/images/motherboard/Msi-A520M-A-Pro-Motherboard-1-1.jpg',
            count: 1,
            type: 'motherboard'
        }
    },

}


module.exports.ProcessorCatagory = {
    Branch: {
        amd: 'AMD',
        intel: 'Intel'
    },
    CPU_Support: {
        amd_am4: 'AMD AM4',
        amd_am5: 'AMD AM5',
        intel_lga_1200: 'Intel LGA 1200',
        intel_lga_1700: 'Intel LGA 1700',
        swrx8: 'SWRX8',
        intel_lga_1851: 'Intel LGA1851',
        str5: 'STR5',

    }
}

module.exports.ComponentsIcon = [
    {
        name: 'Processor',
        price: 699,
        discount: null,
        image: 'assets/images/cpu.png',
        alt: 'CPU',
        type: 'cpu'
    },
    {
        name: "Motherboard",
        price: 1999,
        discount: 1000,
        image: 'assets/images/motherboard.png',
        alt: 'Motherboard',
        type: 'motherboard'
    },
    {
        name: "Ram",
        price: 1999,
        discount: 1000,
        image: 'assets/images/ram.png',
        alt: 'Ram',
        type: 'ram'
    },
    {
        name: "Storage 1",
        price: 1999,
        discount: 1000,
        image: 'assets/images/hard.png',
        alt: 'Storage',
        type: 'storage'
    },
    {
        name: "Storage 2",
        price: 1999,
        discount: 1000,
        image: 'assets/images/hard.png',
        alt: 'Storage',
        type: 'storage'
    },
    {
        name: "Cabinet",
        price: 1999,
        discount: 1000,
        image: 'assets/images/desktop.png',
        alt: 'Cabinet',
        type: 'cabinet'
    },
    {
        name: "Fan",
        price: 1999,
        discount: 1000,
        image: 'assets/images/fan.png',
        alt: 'Fan',
        type: 'fan'
    },
    {
        name: "Cooler",
        price: 1999,
        discount: 1000,
        image: 'assets/images/cooler.png',
        alt: 'Cooler',
        type: 'cooler'
    },
    {
        name: "Graphics Card",
        price: 1999,
        discount: 1000,
        image: 'assets/images/gpu.png',
        alt: 'GPU',
        type: 'gpu'
    },
    {
        name: "Power Supply Unit",
        price: 1999,
        discount: 1000,
        image: 'assets/images/psu.png',
        alt: 'PSU',
        type: 'psu'
    },
    {
        name: "Monitor",
        price: 1999,
        discount: 1000,
        image: 'assets/images/monitor.png',
        alt: 'Monitor',
        type: 'monitor'
    },
    {
        name: "Keyboard",
        price: 1999,
        discount: 1000,
        image: 'assets/images/keyboard.png',
        alt: 'Keyboard',
        type: 'keyboard'
    },
    {
        name: "Mouse",
        price: 1999,
        discount: 1000,
        image: 'assets/images/mouse.png',
        alt: 'Mouse',
        type: 'mouse'
    },
]

