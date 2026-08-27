import React from 'react';
import {Composition} from 'remotion';
import {Scene} from './Scene';
import {RigDemo, RIG_DURATION} from './RigDemo';
import {GiaiTri, GIAITRI_DURATION} from './GiaiTri';
import {LaiKep, LAIKEP_DURATION} from './LaiKep';
import {LaiKepMG, LAIKEPMG_DURATION} from './LaiKepMG';
import {VayNhaMG, VAYNHA_DURATION} from './VayNhaMG';
import {VayNhaLong, VAYNHALONG_DURATION} from './VayNhaLong';
import {BayMGDemo, BAYMG_DURATION} from './BayMGDemo';
import {SpaceLight, SpaceDark, SpacePhoto, NewsCut, SPACE_DURATION} from './SpaceDemo';
import {PaperFx, NewsCutPaper, PAPERFX_DURATION} from './PaperFxDemo';
import {Bay7Pilot, BAY7PILOT_DURATION} from './Bay7Pilot';
import {StyleDemo, STYLEDEMO_DURATION} from './StyleDemo';
import {MachineThumb, MACHINETHUMB_DURATION} from './MachineThumb';
import {CoMayHybrid, COMAY_DURATION} from './CoMayHybrid';
import {MedianDemo, MEDIANDEMO_DURATION} from './MedianDemo';
import {MuaThue, MUATHUE_DURATION} from './MuaThue';
import {MuaThueThumb, MTTHUMB_DURATION} from './MuaThueThumb';
import {LongForm, specDuration} from './Blocks';
import {ALL_SPECS} from './Specs';
import {Short, shortDuration} from './Short';
import {ALL_SHORTS} from './ShortSpecs';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DemoScene"
        component={Scene}
        durationInFrames={285}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RigDemo"
        component={RigDemo}
        durationInFrames={RIG_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="GiaiTri"
        component={GiaiTri}
        durationInFrames={GIAITRI_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="LaiKep"
        component={LaiKep}
        durationInFrames={LAIKEP_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LaiKepMG"
        component={LaiKepMG}
        durationInFrames={LAIKEPMG_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="VayNhaMG"
        component={VayNhaMG}
        durationInFrames={VAYNHA_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="VayNhaLong"
        component={VayNhaLong}
        durationInFrames={VAYNHALONG_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BayMGDemo"
        component={BayMGDemo}
        durationInFrames={BAYMG_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition id="SpaceLight" component={SpaceLight} durationInFrames={SPACE_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="SpaceDark" component={SpaceDark} durationInFrames={SPACE_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="SpacePhoto" component={SpacePhoto} durationInFrames={SPACE_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="NewsCut" component={NewsCut} durationInFrames={SPACE_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="Bay7Pilot" component={Bay7Pilot} durationInFrames={BAY7PILOT_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="StyleDemo" component={StyleDemo} durationInFrames={STYLEDEMO_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="MachineThumb" component={MachineThumb} durationInFrames={MACHINETHUMB_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="CoMayHybrid" component={CoMayHybrid} durationInFrames={COMAY_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="MedianDemo" component={MedianDemo} durationInFrames={MEDIANDEMO_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="MuaThue" component={MuaThue} durationInFrames={MUATHUE_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="MTThumb1" component={MuaThueThumb} defaultProps={{v: 1}} durationInFrames={MTTHUMB_DURATION} fps={30} width={1280} height={720} />
      <Composition id="MTThumb2" component={MuaThueThumb} defaultProps={{v: 2}} durationInFrames={MTTHUMB_DURATION} fps={30} width={1280} height={720} />
      <Composition id="MTThumb3" component={MuaThueThumb} defaultProps={{v: 3}} durationInFrames={MTTHUMB_DURATION} fps={30} width={1280} height={720} />
      <Composition id="MTThumb4" component={MuaThueThumb} defaultProps={{v: 4}} durationInFrames={MTTHUMB_DURATION} fps={30} width={1280} height={720} />
      <Composition id="MTThumb5" component={MuaThueThumb} defaultProps={{v: 5}} durationInFrames={MTTHUMB_DURATION} fps={30} width={1280} height={720} />
      <Composition id="PaperFx" component={PaperFx} durationInFrames={PAPERFX_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="NewsCutPaper" component={NewsCutPaper} durationInFrames={PAPERFX_DURATION} fps={30} width={1920} height={1080} />
      {ALL_SPECS.map((spec) => (
        <Composition
          key={spec.slug}
          id={spec.slug}
          component={LongForm}
          defaultProps={{spec}}
          durationInFrames={specDuration(spec)}
          fps={30}
          width={1920}
          height={1080}
        />
      ))}
      {ALL_SHORTS.map((spec) => (
        <Composition
          key={spec.slug}
          id={spec.slug}
          component={Short}
          defaultProps={{spec}}
          durationInFrames={shortDuration(spec)}
          fps={30}
          width={1080}
          height={1920}
        />
      ))}
    </>
  );
};
