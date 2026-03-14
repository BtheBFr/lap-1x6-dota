// ============================================
// ВСЕ ДАННЫЕ САЙТА - ТОЛЬКО ЭТОТ ФАЙЛ МЕНЯТЬ!
// ============================================

const siteConfig = {
    // Название сайта
    title: "Lap 1x6 Dota",
    subtitle: "от Lap.comp и B the B",
    
    // ============================================
    // ГЕРОИ - добавляйте новых сюда
    // ============================================
    heroes: {
        // -------------------------------------------------
        // ENIGMA
        // -------------------------------------------------
        "enigma": {
            name: "Enigma",
            nameRu: "Энигма,енигма",
            attribute: "strength",
            icon: "icons/heroes/enigma.png",
            
            skills: {
                "q": {
                    name: "Malefice",
                    icon: "icons/skills/enigma/malefice.png",
                    description: "Концентрирует энергию героя на цели, отчего та получает урон и оглушение каждые 2 секунды. Срабатывает на противников в радиусе 250. Наносит крипам на 30% больше урона. Перезарядка способности начинается после конца эффекта.",
                    build: "icons/builds/enigma/enigma_malefice.jpg"
                },
                "w": {
                    name: "Demonic Summoning",
                    icon: "icons/skills/enigma/demonic_summoning.png",
                    description: "Призывает 3 эйдолонов на 16 сек. Их здоровье зависит от макс. здоровья владельца. Эйдолоны раздваиваются после 6 атак, при этом полностью восстанавливая здоровье.",
                    build: "icons/builds/enigma/enigma_demonic_summoning.jpg"
                },
                "e": {
                    name: "Midnight pulse",
                    icon: "icons/skills/enigma/midnight_pulse.png",
                    description: "Наполняет местность тёмным резонансом, который наносит врагам базовый урон и урон их текущего здоровья. Крипы получают больше базового урона, но не получают урон от здоровья. Перезарядка способности начинается после конца эффекта.",
                    build: "icons/builds/enigma/enigma_midnight_pulse.jpg"
                },
                "r": {
                    name: "Black Hole",
                    icon: "icons/skills/enigma/black_hole.png",
                    description: "Создаёт область, радиусом 420. Через 1.2 сек, область превратится в чёрную дыру, всасывающую всех врагов в зоне действия. При этом они не могут двигаться, атаковать и применять способности. Наносит крипам на 150% больше урона.",
                    build: "icons/builds/enigma/enigma_black_hole.jpg"
                }
            }
        },
        
        // -------------------------------------------------
        // ZEUS 
        // -------------------------------------------------
        "zeus": {
            name: "Zeus",
            nameRu: "Зевс",
            attribute: "strength",
            icon: "icons/heroes/zeus.png",
            
            skills: {
                "q": {
                    name: "Arc Lightning",
                    icon: "icons/skills/zeus/arc_lightning.png",
                    description: "Выпускает молнию, которая перескакивает с одного врага на другого, нанося магический урон.",
                    build: "icons/builds/zeus/zeus_arc_lightning.jpg"
                },
                "w": {
                    name: "Lightning Bolt",
                    icon: "icons/skills/zeus/lightning_bolt.png",
                    description: "Бьет молнией по врагу. Дает обзор цели.",
                    build: "builds/zeus/lightning_bolt.jpg"
                },
                "e": {
                    name: "Static Field",
                    icon: "icons/skills/zeus/static_field.png",
                    description: "Пассивно бьет молнией врагов рядом когда используете скиллы.",
                    build: "builds/zeus/static_field.jpg"
                },
                "r": {
                    name: "Thundergod's Wrath",
                    icon: "icons/skills/zeus/thundergod_wrath.png",
                    description: "Бьет молнией всех врагов на карте.",
                    build: "builds/zeus/thundergod_wrath.jpg"
                }
            }
        }
    }
};
