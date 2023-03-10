import { GlobalStyle } from "components/GlobalStyle";
import HealthBar from "components/HealthBar";
import TypeBadge from "components/TypeBadge";
import TypeColored from "components/TypeColored";
import getHpColor from "lib/helpers/getHpColor";
import useMapperValue from "lib/hooks/useMapperValue";
import useMoveList from "lib/hooks/useMoveList";
import usePokedex from "lib/hooks/usePokedex";
import Move from "lib/types/Move";
import { FC } from "react";

const config = {
  useBattleUi: true,
};

const MoveRow: FC<{
  move?: Move;
  pp: number | null;
  pokemonTypes: [string, string];
}> = ({ move, pp, pokemonTypes }) => {
  return (
    <tr>
      <td>
        <TypeColored type={move?.type}>{move?.name ?? "--"}</TypeColored>
      </td>
      <td style={{ textAlign: "right" }}>{move?.name ? pp ?? "--" : "--"}</td>
      <td style={{ textAlign: "right" }}>
        {move?.pwr
          ? pokemonTypes.includes(move?.type ?? "")
            ? Math.floor(move.pwr * 1.5)
            : move.pwr
          : "--"}
      </td>
      <td style={{ textAlign: "right" }}>{move?.acc ?? "--"}</td>
    </tr>
  );
};

type Pokemon = {
  species: string;
  nickname?: string;
  type1: string;
  type2: string;
  level: number;
  hp: number;
  maxHp: number;
  stats: {
    atk: number;
    def: number;
    spc: number;
    spe: number;
  };
  move1: string | null;
  move2: string | null;
  move3: string | null;
  move4: string | null;
  move1pp: number | null;
  move2pp: number | null;
  move3pp: number | null;
  move4pp: number | null;
};

const BattlePokemonData: FC<{
  pokemon: Pokemon;
  movelist: Move[];
  pokedex: { number: number; name: string }[];
  mode: "mini" | "compact" | "full";
  hideHp?: boolean;
}> = ({ pokemon, movelist, pokedex, mode, hideHp = false }) => {
  const moves: [string | null, number | null][] = [
    [pokemon.move1, pokemon.move1pp],
    [pokemon.move2, pokemon.move2pp],
    [pokemon.move3, pokemon.move3pp],
    [pokemon.move4, pokemon.move4pp],
  ];

  const dexNo = pokedex.find(({ name }) => name === pokemon.species)?.number;

  const sprite =
    dexNo != null
      ? `https://serebii.net/pokearth/sprites/rb/${dexNo
          .toString()
          .padStart(3, "0")}.png`
      : "https://archives.bulbagarden.net/media/upload/6/62/Ghost_I_purple.png";

  if (mode === "mini") {
    return (
      <div
        style={{
          width: "60px",
          marginRight: "10px",
          display: "inline-block",
          textAlign: "right",
        }}
      >
        <img
          src={sprite}
          style={{
            float: "left",
            height: "60px",
            width: "60px",
          }}
        />
        <HealthBar percent={pokemon.hp / pokemon.maxHp} />
        <div>
          <small style={{ color: getHpColor(pokemon.hp / pokemon.maxHp) }}>
            {pokemon.hp}HP
          </small>
        </div>
        {!hideHp && <div>:L{pokemon.level}</div>}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        marginBottom: "15px",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
      >
        <img
          src={sprite}
          style={{
            float: "left",
            height: "60px",
            width: "60px",
            marginRight: "10px",
          }}
        />
        <div>
          <h3>{pokemon.nickname || pokemon.species}</h3>
          <small>
            <TypeBadge>{pokemon.type1}</TypeBadge>{" "}
            {pokemon.type2 !== pokemon.type1 && (
              <TypeBadge>{pokemon.type2}</TypeBadge>
            )}
          </small>
        </div>
      </div>
      <HealthBar percent={pokemon.hp / pokemon.maxHp} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>:L{pokemon.level}</span>
        {!hideHp && (
          <span>
            {pokemon.hp}/{pokemon.maxHp}
          </span>
        )}
      </div>
      {mode === "full" && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: ".5em",
            gap: "10px",
          }}
        >
          <table style={{ flexGrow: 1 }}>
            <thead>
              <tr>
                <th>MOVE</th>
                <th>PP</th>
                <th>POW</th>
                <th>ACC</th>
              </tr>
            </thead>
            <tbody>
              {moves.map(([moveName, movePp], i) => (
                <MoveRow
                  key={i}
                  pp={movePp}
                  move={movelist.find(
                    ({ name }) => name.toLowerCase() === moveName?.toLowerCase()
                  )}
                  pokemonTypes={[pokemon.type1, pokemon.type2]}
                />
              ))}
            </tbody>
          </table>
          {pokemon.stats && (
            <table style={{ whiteSpace: "nowrap", textAlign: "right" }}>
              <tbody>
                <tr>
                  <td>HP</td>
                  <td>{pokemon.maxHp}</td>
                </tr>
                <tr>
                  <td>ATK</td>
                  <td>{pokemon.stats.atk}</td>
                </tr>
                <tr>
                  <td>DEF</td>
                  <td>{pokemon.stats.def}</td>
                </tr>
                <tr>
                  <td>SPC</td>
                  <td>{pokemon.stats.spc}</td>
                </tr>
                <tr>
                  <td>SPE</td>
                  <td>{pokemon.stats.spe}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default function HomePage() {
  const pokedex = usePokedex("rby");
  const movelist = useMoveList("rby");

  const teamCount = useMapperValue<number>("player.teamCount") || 0;
  const party = [0, 1, 2, 3, 4, 5].map<{
    pokemon: Pokemon;
    partyIndex: number;
  }>((i) => {
    return {
      partyIndex: i,
      pokemon: {
        species: useMapperValue<string>(`player.team.${i}.species`) ?? "",
        nickname: useMapperValue<string>(`player.team.${i}.nickname`) ?? "",
        type1: useMapperValue<string>(`player.team.${i}.type1`) ?? `Normal`,
        type2: useMapperValue<string>(`player.team.${i}.type2`) ?? "Normal",
        level: useMapperValue<number>(`player.team.${i}.level`) ?? 0,
        hp: useMapperValue<number>(`player.team.${i}.hp`) ?? 0,
        maxHp: useMapperValue<number>(`player.team.${i}.maxHp`) ?? 0,
        move1: useMapperValue<string>(`player.team.${i}.move1`),
        move2: useMapperValue<string>(`player.team.${i}.move2`),
        move3: useMapperValue<string>(`player.team.${i}.move3`),
        move4: useMapperValue<string>(`player.team.${i}.move4`),
        move1pp: useMapperValue<number>(`player.team.${i}.move1pp`),
        move2pp: useMapperValue<number>(`player.team.${i}.move2pp`),
        move3pp: useMapperValue<number>(`player.team.${i}.move3pp`),
        move4pp: useMapperValue<number>(`player.team.${i}.move4pp`),
        stats: {
          hp: useMapperValue<number>(`player.team.${i}.maxHp`) ?? 0,
          atk: useMapperValue<number>(`player.team.${i}.attack`) ?? 0,
          def: useMapperValue<number>(`player.team.${i}.defense`) ?? 0,
          spc: useMapperValue<number>(`player.team.${i}.special`) ?? 0,
          spe: useMapperValue<number>(`player.team.${i}.speed`) ?? 0,
        },
      },
    };
  });

  const battleType = useMapperValue<"Wild" | "Trainer" | "None">("battle.type");

  const battleAllySpecies = useMapperValue<string>(
    "battle.yourPokemon.species"
  );
  const battleAllyNickname = useMapperValue<string>(
    "battle.yourPokemon.nickname"
  );
  const currentBattlePokemon = party.find(
    (partyPokemon) =>
      partyPokemon.pokemon.species === battleAllySpecies &&
      partyPokemon.pokemon.nickname === battleAllyNickname
  );

  const battle = {
    ally: {
      species: battleAllySpecies ?? "",
      nickname: battleAllyNickname ?? "",
      type1: useMapperValue<string>("battle.yourPokemon.type1") ?? "Normal",
      type2: useMapperValue<string>("battle.yourPokemon.type2") ?? "Normal",
      level: currentBattlePokemon?.pokemon.level ?? 0,
      hp: useMapperValue<number>("battle.yourPokemon.battleStatHp") ?? 0,
      maxHp: useMapperValue<number>("battle.yourPokemon.battleStatMaxHp") ?? 0,
      move1: useMapperValue<string>("battle.yourPokemon.move1"),
      move2: useMapperValue<string>("battle.yourPokemon.move2"),
      move3: useMapperValue<string>("battle.yourPokemon.move3"),
      move4: useMapperValue<string>("battle.yourPokemon.move4"),
      move1pp: useMapperValue<number>("battle.yourPokemon.move1pp"),
      move2pp: useMapperValue<number>("battle.yourPokemon.move2pp"),
      move3pp: useMapperValue<number>("battle.yourPokemon.move3pp"),
      move4pp: useMapperValue<number>("battle.yourPokemon.move4pp"),
      stats: {
        atk: useMapperValue<number>("battle.yourPokemon.battleStatAttack") ?? 0,
        def:
          useMapperValue<number>("battle.yourPokemon.battleStatDefense") ?? 0,
        spc:
          useMapperValue<number>("battle.yourPokemon.battleStatSpecial") ?? 0,
        spe: useMapperValue<number>("battle.yourPokemon.battleStatSpeed") ?? 0,
      },
    },
    foe: {
      species: useMapperValue<string>("battle.enemyPokemon.species") ?? "",
      type1: useMapperValue<string>("battle.enemyPokemon.type1") ?? "Normal",
      type2: useMapperValue<string>("battle.enemyPokemon.type2") ?? "Normal",
      level: useMapperValue<number>("battle.enemyPokemon.level") ?? 0,
      hp: useMapperValue<number>("battle.enemyPokemon.hp") ?? 0,
      maxHp: useMapperValue<number>("battle.enemyPokemon.maxHp") ?? 0,
      move1: useMapperValue<string>("battle.enemyPokemon.move1"),
      move2: useMapperValue<string>("battle.enemyPokemon.move2"),
      move3: useMapperValue<string>("battle.enemyPokemon.move3"),
      move4: useMapperValue<string>("battle.enemyPokemon.move4"),
      move1pp: null,
      move2pp: null,
      move3pp: null,
      move4pp: null,
      stats: {
        hp: useMapperValue<number>(`battle.enemyPokemon.maxHp`) ?? 0,
        atk: useMapperValue<number>(`battle.enemyPokemon.attack`) ?? 0,
        def: useMapperValue<number>(`battle.enemyPokemon.defense`) ?? 0,
        spc: useMapperValue<number>(`battle.enemyPokemon.special`) ?? 0,
        spe: useMapperValue<number>(`battle.enemyPokemon.speed`) ?? 0,
      },
    },
  };

  const currentMap = useMapperValue<string>("overworld.map");

  const gameTime = {
    hours: useMapperValue<number>("gameTime.hours") ?? 0,
    minutes: useMapperValue<number>("gameTime.minutes") ?? 0,
    seconds: useMapperValue<number>("gameTime.seconds") ?? 0,
  };

  const location =
    battleType !== "None" && config.useBattleUi ? "Battle!" : currentMap;

  return (
    <main>
      <GlobalStyle />
      <div
        style={{
          height: "60px",
          marginBottom: "10px",
          backgroundColor: "darkred",
        }}
      />
      <div style={{ width: "420px", padding: "5px" }}>
        <h2
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {location}
          <span
            style={{
              border: "1px solid white",
              padding: "5px",
              display: "inline-block",
            }}
          >
            {gameTime.hours}:{gameTime.minutes.toString().padStart(2, "0")}:
            {gameTime.seconds.toString().padStart(2, "0")}
          </span>
        </h2>
        {battleType !== "None" && config.useBattleUi ? (
          <section id="battle">
            <BattlePokemonData
              pokedex={pokedex}
              movelist={movelist}
              pokemon={battle.foe}
              mode="compact"
              hideHp
            />
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "stretch",
                margin: "5px",
              }}
            >
              <div style={{ width: "100%", borderBottom: "1px solid white" }} />
              VS
              <div style={{ width: "100%", borderBottom: "1px solid white" }} />
            </div>
            <BattlePokemonData
              pokedex={pokedex}
              movelist={movelist}
              pokemon={battle.ally}
              mode="full"
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {party
                .filter(
                  (member) =>
                    member.partyIndex < teamCount &&
                    member.partyIndex !== currentBattlePokemon?.partyIndex
                )
                .map((member) => (
                  <BattlePokemonData
                    key={member.partyIndex}
                    pokedex={pokedex}
                    movelist={movelist}
                    pokemon={member.pokemon}
                    mode="mini"
                  />
                ))}
            </div>
          </section>
        ) : (
          <section id="ow">
            {party
              .filter((member) => member.partyIndex < teamCount)
              .map((member, i) => (
                <div key={member.partyIndex}>
                  <BattlePokemonData
                    pokedex={pokedex}
                    movelist={movelist}
                    pokemon={member.pokemon}
                    mode={i !== 0 ? "compact" : "full"}
                  />
                </div>
              ))}
          </section>
        )}
      </div>
    </main>
  );
}
