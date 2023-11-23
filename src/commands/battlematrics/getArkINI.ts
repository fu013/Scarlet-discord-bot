import { SlashCommandBuilder } from "discord.js";
import { makeCodeBlock } from "../../lib/makeCodeBlock";

const INI_TEXT: string = `CLEAR VISUALS 
r.VolumetricCloud 0 | r.VolumetricFog 0 | sg.GlobalIlluminationQuality 1 | r.SkylightIntensityMultiplier 3 | r.Shadow.Virtual.Enable 0 | r.Shadow.CSM.MaxCascades 0 | r.DistanceFieldShadowing 1 | r.ContactShadows 0 | wp.Runtime.HLOD 0 | grass.Enable 0 | r.Nanite.MaxPixelsPerEdge 1 | r.PostProcessing.DisableMaterials 1

NO WATER
r.Water.SingleLayer.Reflection 0

CONSOLE 
r.VolumetricFog 0 | r.Nanite.MaxPixelsPerEdge 2 | r.Shadow.CSM.MaxCascades 0 | r.ContactShadows 0 | r.SkylightIntensityMultiplier 3 | r.VolumetricCloud 0 | grass.Enable 0 | wp.Runtime.HLOD 0

DROP COMMAND --> IF YOU DON'T SEE EM
r.Lumen.DiffuseIndirect.Allow 1

TAMING / SCOUTING --> take everything away
r.Nanite.MaxVisibleClusters 1 --> TAKE AWAY
r.Nanite.MaxVisibleClusters 100000 --> TAKE BACK 

PERFOMANCE BUT NO BLURRY ICONS
grass.Enable 0 | show InstancedStaticMeshes | show InstancedGrass | showInstancedFoliage | r.Water.SingleLayer.Reflection 0 |  r.SkyAtmosphere 0 |  r.Shadow.Virtual.Enable 0 | r.BloomQuality 0 | r.VolumetricCloud 0 | r.DistanceFieldShadowing 0 | r.Shadow.CSM.MaxCascades 0 | r.ShadowQuality 0 | r.VolumetricFog 0 | sg.FoliageQuality 0 | sg.TextureQuality 0 |


TAMING SCOUTING
r.Nanite.MaxPixelsPerEdge 4
r.Nanite.MaxPixelsPerEdge 40000`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("아크-이니")
    .setDescription("아크 이니 명령어를 출력합니다."),
  async execute(interaction: any) {
    await interaction.reply(makeCodeBlock(INI_TEXT));
  },
};
