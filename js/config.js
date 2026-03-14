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
        // LUNA
        // -------------------------------------------------
        "luna": {
            name: "Luna",
            nameRu: "Луна",
            icon: "icons/heroes/luna.png",
            
            skills: {
                "q": {
                    name: "Lucent Beam",
                    icon: "icons/skills/luna/lucent_beam.png",
                    description: "Наносит магический урон одной цели. Можно улучшить талантом на перезарядку.",
                    build: "builds/luna/lucent_beam.jpg"
                },
                "w": {
                    name: "Moon Glaive",
                    icon: "icons/skills/luna/moon_glaive.png",
                    description: "Атаки перескакивают на ближайших врагов. С каждым прыжком урон снижается.",
                    build: "builds/luna/moon_glaive.jpg"
                },
                "e": {
                    name: "Lunar Blessing",
                    icon: "icons/skills/luna/lunar_blessing.png",
                    description: "Пассивно увеличивает урон союзникам. Дает бонус к дальности атаки ночью.",
                    build: "builds/luna/lunar_blessing.jpg"
                },
                "r": {
                    name: "Eclipse",
                    icon: "icons/skills/luna/eclipse.png",
                    description: "Призывает лунные лучи, которые бьют по врагам вокруг. Длится несколько секунд.",
                    build: "builds/luna/eclipse.jpg"
                },
                "d": {
                    name: "Dragon Lance",
                    icon: "icons/skills/luna/dragon_lance.png",
                    description: "Увеличивает дальность атаки и дает характеристики.",
                    build: "builds/luna/dragon_lance.jpg"
                },
                "f": {
                    name: "Butterfly",
                    icon: "icons/skills/luna/butterfly.png",
                    description: "Дает уклонение, скорость атаки и ловкость.",
                    build: "builds/luna/butterfly.jpg"
                }
            }
        },
        
        // -------------------------------------------------
        // PUDGE
        // -------------------------------------------------
        "pudge": {
            name: "Pudge",
            nameRu: "Пудж",
            icon: "icons/heroes/pudge.png",
            
            skills: {
                "q": {
                    name: "Meat Hook",
                    icon: "icons/skills/pudge/hook.png",
                    description: "Бросает крюк, который зацепляет первого врага и притягивает к Pudge.",
                    build: "builds/pudge/hook.jpg"
                },
                "w": {
                    name: "Rot",
                    icon: "icons/skills/pudge/rot.png",
                    description: "Наносит урон всем вокруг, но также замедляет и наносит урон самому Pudge.",
                    build: "builds/pudge/rot.jpg"
                },
                "e": {
                    name: "Flesh Heap",
                    icon: "icons/skills/pudge/flesh_heap.png",
                    description: "Пассивно дает сопротивление магии и силу за каждый труп рядом.",
                    build: "builds/pudge/flesh_heap.jpg"
                },
                "r": {
                    name: "Dismember",
                    icon: "icons/skills/pudge/dismember.png",
                    description: "Хватает врага и наносит урон с течением времени, оглушая его.",
                    build: "builds/pudge/dismember.jpg"
                }
            }
        },
        
        // -------------------------------------------------
        // ZEUS (ДОБАВЛЕН ПРАВИЛЬНО)
        // -------------------------------------------------
        "zeus": {
            name: "Zeus",
            nameRu: "Зевс",
            icon: "icons/heroes/zeus.png",
            
            skills: {
                "q": {
                    name: "Arc Lightning",
                    icon: "icons/skills/zeus/arc_lightning.png",
                    description: "Выпускает молнию, которая перескакивает с одного врага на другого, нанося магический урон.",
                    build: "builds/zeus/zeus_arc_lightning.jpg"
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
