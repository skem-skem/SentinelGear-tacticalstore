import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: "postgresql://postgres:password@localhost:5432/tacticalstore" });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
    const airsoft = await prisma.category.create({ data: { name: "Airsoft" } })
    const equipment = await prisma.category.create({ data: { name: "Equipment" } })

    const rifles = await prisma.category.create({ data: { name: "Rifles", parentId: airsoft.id } });
    const pistols = await prisma.category.create({ data: { name: "Pistols", parentId: airsoft.id } });
    const dmr = await prisma.category.create({ data: { name: "DMR", parentId: airsoft.id } });
    const magazines = await prisma.category.create({ data: { name: "Magazines", parentId: airsoft.id } });
    const parts = await prisma.category.create({ data: { name: "Parts", parentId: airsoft.id } });
    const jackets = await prisma.category.create({ data: { name: "Jackets", parentId: equipment.id } });
    const helmets = await prisma.category.create({ data: { name: "Helmets", parentId: equipment.id } });
    const boots = await prisma.category.create({ data: { name: "Boots", parentId: equipment.id } });

    await prisma.product.createMany({
        data: [
            { name: "AK-74 Full Metal", description: "Full metal AK-74 with adjustable hopup and 450 FPS.", price: 250, stock: 15, categoryId: rifles.id },
            { name: "M4A1 CQB", description: "Compact M4A1 with RIS rail system and metal gearbox.", price: 220, stock: 10, categoryId: rifles.id },
            { name: "G36C Polymer", description: "Lightweight G36C with folding stock and high-cap magazine.", price: 180, stock: 12, categoryId: rifles.id },
            { name: "HK416 Full Metal", description: "Premium HK416 with crane stock and ETU system.", price: 320, stock: 8, categoryId: rifles.id },
            { name: "AUG A2 Steyr", description: "Bullpup design AUG with built-in scope and full metal internals.", price: 290, stock: 6, categoryId: rifles.id },
        ]
    });

    await prisma.product.createMany({
        data: [
            { name: "Glock 17 GBB", description: "Gas blowback Glock 17 with realistic recoil and metal slide.", price: 120, stock: 20, categoryId: pistols.id },
            { name: "1911 Full Metal", description: "Classic 1911 full metal construction with single action trigger.", price: 110, stock: 15, categoryId: pistols.id },
            { name: "M9 Beretta GBB", description: "Full size M9 with gas blowback system and double action trigger.", price: 130, stock: 18, categoryId: pistols.id },
            { name: "USP Compact", description: "Compact USP with polymer frame and adjustable rear sight.", price: 100, stock: 22, categoryId: pistols.id },
            { name: "Desert Eagle .50", description: "Iconic Desert Eagle GBB with heavy metal slide and realistic kick.", price: 160, stock: 10, categoryId: pistols.id },
        ]
    });

    await prisma.product.createMany({
        data: [
            { name: "SVD Dragunov", description: "Semi-auto Dragunov with wooden furniture and PSO-1 scope replica.", price: 380, stock: 5, categoryId: dmr.id },
            { name: "SR-25 Marksman", description: "SR-25 with full metal body and precision inner barrel.", price: 350, stock: 6, categoryId: dmr.id },
            { name: "M14 SOCOM", description: "M14 SOCOM with EBR chassis and adjustable stock.", price: 340, stock: 7, categoryId: dmr.id },
            { name: "VSS Vintorez", description: "Russian VSS with integrated suppressor and folding stock.", price: 400, stock: 4, categoryId: dmr.id },
            { name: "PSG-1 Sniper", description: "High precision PSG-1 with adjustable cheek rest and bipod.", price: 420, stock: 3, categoryId: dmr.id },
        ]
    });

    await prisma.product.createMany({
        data: [
            { name: "M4 Hi-Cap 300rds", description: "300 round hi-cap magazine compatible with M4/M16 series.", price: 15, stock: 50, categoryId: magazines.id },
            { name: "AK Mid-Cap 150rds", description: "150 round mid-cap magazine for AK series rifles.", price: 18, stock: 45, categoryId: magazines.id },
            { name: "G36 Hi-Cap 470rds", description: "470 round hi-cap magazine for G36 series.", price: 20, stock: 30, categoryId: magazines.id },
            { name: "MP5 30rds Box Set", description: "Set of 3 realistic 30 round magazines for MP5.", price: 25, stock: 35, categoryId: magazines.id },
            { name: "Glock 50rds Extended", description: "Extended 50 round magazine for Glock series pistols.", price: 22, stock: 40, categoryId: magazines.id },
        ]
    });

    await prisma.product.createMany({
        data: [
            { name: "Prometheus 6.03 Barrel", description: "Tight bore 6.03mm inner barrel for improved accuracy.", price: 45, stock: 25, categoryId: parts.id },
            { name: "SHS High Torque Motor", description: "High torque motor for improved trigger response.", price: 35, stock: 20, categoryId: parts.id },
            { name: "Modify XT-30 Gearbox", description: "Reinforced version 2 gearbox with QD spring system.", price: 90, stock: 10, categoryId: parts.id },
            { name: "Madbull Shark Hop Rubber", description: "Soft hop-up rubber for heavy BBs and long range.", price: 12, stock: 40, categoryId: parts.id },
            { name: "Gate TITAN V2 MOSFET", description: "Advanced programmable MOSFET with precocking and burst mode.", price: 75, stock: 15, categoryId: parts.id },
        ]
    });

    await prisma.product.createMany({
        data: [
            { name: "Multicam Combat Jacket", description: "Lightweight multicam jacket with elbow pad inserts and YKK zippers.", price: 85, stock: 20, categoryId: jackets.id },
            { name: "ACU Field Jacket", description: "Army combat uniform jacket with reinforced shoulders and elbows.", price: 70, stock: 18, categoryId: jackets.id },
            { name: "Woodland BDU Jacket", description: "Classic woodland BDU jacket with four cargo pockets.", price: 55, stock: 25, categoryId: jackets.id },
            { name: "Flecktarn Smock", description: "German flecktarn pattern smock with hood and cargo pockets.", price: 90, stock: 12, categoryId: jackets.id },
            { name: "CADPAT Softshell", description: "Canadian CADPAT pattern softshell jacket, windproof and water resistant.", price: 110, stock: 8, categoryId: jackets.id },
        ]
    });

    await prisma.product.createMany({
        data: [
            { name: "FAST Helmet BJ Cut", description: "Ballistic jump cut FAST helmet replica with NVG mount and rails.", price: 65, stock: 15, categoryId: helmets.id },
            { name: "MICH 2000 Helmet", description: "MICH 2000 with ARC rails and velcro panels for patches.", price: 55, stock: 20, categoryId: helmets.id },
            { name: "ACH Advanced Helmet", description: "Advanced combat helmet with retention system and foam padding.", price: 60, stock: 18, categoryId: helmets.id },
            { name: "PASGT Kevlar Replica", description: "Classic PASGT helmet replica with chinstrap and camo cover.", price: 45, stock: 22, categoryId: helmets.id },
            { name: "Ops-Core FAST SF", description: "Premium Ops-Core replica with side rails and BOA retention.", price: 95, stock: 10, categoryId: helmets.id },
        ]
    });

    await prisma.product.createMany({
        data: [
            { name: "Lowa Zephyr GTX", description: "Gore-tex tactical boots with vibram sole, waterproof and lightweight.", price: 180, stock: 15, categoryId: boots.id },
            { name: "Magnum Viper Pro", description: "Side zip tactical boots with composite toe cap and slip resistant sole.", price: 120, stock: 20, categoryId: boots.id },
            { name: "Haix Black Eagle", description: "Professional tactical boots with climate system and ankle support.", price: 210, stock: 10, categoryId: boots.id },
            { name: "Altama OTB Maritime", description: "Over the beach boots, quick drain and fast drying for wet environments.", price: 150, stock: 12, categoryId: boots.id },
            { name: "Merrell Moab 2 Tactical", description: "Lightweight tactical hiking boots with Vibram TC5+ outsole.", price: 140, stock: 18, categoryId: boots.id },
        ]
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });