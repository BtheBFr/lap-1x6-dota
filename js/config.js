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
        // WRAITH KING
        // -------------------------------------------------
        "wraith_king": {
            name: "Wraith King",
            nameRu: "Враит кинг, врайт кинг, врай кинг, врайт кин, враит кин, врай кин",
            attribute: "strength",
            icon: "icons/heroes/wraith_king.png",
            
            skills: {
                "q": {
                    name: "Wraithfire Blast",
                    icon: "icons/skills/wraith_king/wraithfire_blast.png",
                    description: "Герой опаляет цель призрачным огнём, оглушая её и нанося ей урон. После оглушения цель будет получать периодический урон и замедлится. Срабатывает на всех противников в радиусе 250. Наносит крипам на 30% больше урона.",
                    build: "icons/builds/wraith_king/wraith_king_wraithfire_blast.jpg"
                },
                "w": {
                    name: "Bone Guard",
                    icon: "icons/skills/wraith_king/bone_guard.png",
                    description: "",
                    build: "icons/builds/wraith_king/wraith_king_bone_guard.jpg"
                },
                "e": {
                    name: "Heavenly Jump",
                    icon: "icons/skills/zeus/heavenly_jump.png",
                    description: "Герой совершает божественный прыжок и бьёт током 3 ближайших противников, нанеся им урон и замедлив передвижение и атаку. Способность на 3 сек даёт беспрепятственный обзор в радиусе 900 вокруг владельца.",
                    build: "icons/builds/zeus/heavenly_jump.jpg"
                },
                "r": {
                    name: "Thundergod's Wrath",
                    icon: "icons/skills/zeus/thundergods_wrath.png",
                    description: "Поражает всех вражеских врагов молнией вне зависимости от их местоположения, нанося магический урон. Способность также раскрывает невидимость вражеских существ вокруг каждого поражённого противника. Если герой врага невидим, то он не получит урона, но невидимость всё равно раскроется. Наносит только 60% урона целям на расстоянии большем чем 2500. Наносит урон крипам в радиусе 1500.",
                    build: "icons/builds/zeus/thundergods_wrath.jpg"
                }
            }
        }, 
        // -------------------------------------------------
        // ZEUS 
        // -------------------------------------------------
        "zeus": {
            name: "Zeus",
            nameRu: "Зевс",
            attribute: "intellect",
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
                    description: "Ударом молнии наносит врагу урон и ненадолго его оглушает. Наносит крипам в 2 раза больше урона. В точке применения дает обзор радиусом 750 на 6 сек. Также раскрывает невидимость цели и дает на нее обзор. Не раскрывает невидимость вардов.",
                    build: "icons/builds/zeus/zeus_lightning_bolt.jpg"
                },
                "e": {
                    name: "Heavenly Jump",
                    icon: "icons/skills/zeus/heavenly_jump.png",
                    description: "Герой совершает божественный прыжок и бьёт током 3 ближайших противников, нанеся им урон и замедлив передвижение и атаку. Способность на 3 сек даёт беспрепятственный обзор в радиусе 900 вокруг владельца.",
                    build: "icons/builds/zeus/heavenly_jump.jpg"
                },
                "r": {
                    name: "Thundergod's Wrath",
                    icon: "icons/skills/zeus/thundergods_wrath.png",
                    description: "Поражает всех вражеских врагов молнией вне зависимости от их местоположения, нанося магический урон. Способность также раскрывает невидимость вражеских существ вокруг каждого поражённого противника. Если герой врага невидим, то он не получит урона, но невидимость всё равно раскроется. Наносит только 60% урона целям на расстоянии большем чем 2500. Наносит урон крипам в радиусе 1500.",
                    build: "icons/builds/zeus/thundergods_wrath.jpg"
                }
            }
        }, 
        // -------------------------------------------------
        // ENIGMA
        // -------------------------------------------------
        "enigma": {
            name: "Enigma",
            nameRu: "Энигма, енигма",
            attribute: "universal",
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
        }
    }
};
