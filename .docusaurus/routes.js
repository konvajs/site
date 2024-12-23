import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/docs/sandbox.html',
    component: ComponentCreator('/docs/sandbox.html', 'd01'),
    exact: true
  },
  {
    path: '/docs/sandbox/index.html',
    component: ComponentCreator('/docs/sandbox/index.html', '066'),
    exact: true
  },
  {
    path: '/kai',
    component: ComponentCreator('/kai', '0b9'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '8a3'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'a99'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '3c6'),
            routes: [
              {
                path: '/api/Konva.Animation.html',
                component: ComponentCreator('/api/Konva.Animation.html', '3f9'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Arc.html',
                component: ComponentCreator('/api/Konva.Arc.html', '53b'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Arrow.html',
                component: ComponentCreator('/api/Konva.Arrow.html', '94d'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Canvas.html',
                component: ComponentCreator('/api/Konva.Canvas.html', 'abf'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Circle.html',
                component: ComponentCreator('/api/Konva.Circle.html', 'a2a'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Container.html',
                component: ComponentCreator('/api/Konva.Container.html', '746'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Context.html',
                component: ComponentCreator('/api/Konva.Context.html', '86a'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Easings.html',
                component: ComponentCreator('/api/Konva.Easings.html', '5f4'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Ellipse.html',
                component: ComponentCreator('/api/Konva.Ellipse.html', 'f53'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.FastLayer.html',
                component: ComponentCreator('/api/Konva.FastLayer.html', 'cd6'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Filters.html',
                component: ComponentCreator('/api/Konva.Filters.html', '5ea'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Group.html',
                component: ComponentCreator('/api/Konva.Group.html', 'e6a'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.html',
                component: ComponentCreator('/api/Konva.html', '022'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Image.html',
                component: ComponentCreator('/api/Konva.Image.html', '3c3'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Label.html',
                component: ComponentCreator('/api/Konva.Label.html', '149'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Layer.html',
                component: ComponentCreator('/api/Konva.Layer.html', '70a'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Line.html',
                component: ComponentCreator('/api/Konva.Line.html', '6dc'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Node.html',
                component: ComponentCreator('/api/Konva.Node.html', '6e2'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Path.html',
                component: ComponentCreator('/api/Konva.Path.html', '595'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Rect.html',
                component: ComponentCreator('/api/Konva.Rect.html', 'a8a'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.RegularPolygon.html',
                component: ComponentCreator('/api/Konva.RegularPolygon.html', '366'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Ring.html',
                component: ComponentCreator('/api/Konva.Ring.html', 'b0e'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Shape.html',
                component: ComponentCreator('/api/Konva.Shape.html', 'ddf'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Sprite.html',
                component: ComponentCreator('/api/Konva.Sprite.html', '3ca'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Stage.html',
                component: ComponentCreator('/api/Konva.Stage.html', '48f'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Star.html',
                component: ComponentCreator('/api/Konva.Star.html', 'f7b'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Tag.html',
                component: ComponentCreator('/api/Konva.Tag.html', '70a'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Text.html',
                component: ComponentCreator('/api/Konva.Text.html', '35d'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.TextPath.html',
                component: ComponentCreator('/api/Konva.TextPath.html', 'd6f'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Transform.html',
                component: ComponentCreator('/api/Konva.Transform.html', '893'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Transformer.html',
                component: ComponentCreator('/api/Konva.Transformer.html', 'c51'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Tween.html',
                component: ComponentCreator('/api/Konva.Tween.html', '51c'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Util.html',
                component: ComponentCreator('/api/Konva.Util.html', 'e49'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/api/Konva.Wedge.html',
                component: ComponentCreator('/api/Konva.Wedge.html', 'a1a'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/category/shapes',
                component: ComponentCreator('/category/shapes', '146'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/animations/Create_an_Animation.html',
                component: ComponentCreator('/docs/animations/Create_an_Animation.html', '2c3'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/animations/Moving.html',
                component: ComponentCreator('/docs/animations/Moving.html', 'd30'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/animations/Rotation.html',
                component: ComponentCreator('/docs/animations/Rotation.html', 'fdc'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/animations/Scaling.html',
                component: ComponentCreator('/docs/animations/Scaling.html', '73d'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/animations/Stop_Animation.html',
                component: ComponentCreator('/docs/animations/Stop_Animation.html', 'c27'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/clipping/Clipping_Function.html',
                component: ComponentCreator('/docs/clipping/Clipping_Function.html', 'f7d'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/clipping/Clipping_Regions.html',
                component: ComponentCreator('/docs/clipping/Clipping_Regions.html', '38d'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/data_and_serialization/Best_Practices.html',
                component: ComponentCreator('/docs/data_and_serialization/Best_Practices.html', 'a29'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/data_and_serialization/Complex_Load.html',
                component: ComponentCreator('/docs/data_and_serialization/Complex_Load.html', '647'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/data_and_serialization/High-Quality-Export.html',
                component: ComponentCreator('/docs/data_and_serialization/High-Quality-Export.html', '148'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/data_and_serialization/Serialize_a_Stage.html',
                component: ComponentCreator('/docs/data_and_serialization/Serialize_a_Stage.html', '602'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/data_and_serialization/Simple_Load.html',
                component: ComponentCreator('/docs/data_and_serialization/Simple_Load.html', 'af2'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/data_and_serialization/Stage_Data_URL.html',
                component: ComponentCreator('/docs/data_and_serialization/Stage_Data_URL.html', 'f92'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/donate.html',
                component: ComponentCreator('/docs/donate.html', 'ed5'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/drag_and_drop/Complex_Drag_and_Drop.html',
                component: ComponentCreator('/docs/drag_and_drop/Complex_Drag_and_Drop.html', '8b1'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/drag_and_drop/Drag_a_Group.html',
                component: ComponentCreator('/docs/drag_and_drop/Drag_a_Group.html', '5fb'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/drag_and_drop/Drag_a_Line.html',
                component: ComponentCreator('/docs/drag_and_drop/Drag_a_Line.html', '3f9'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/drag_and_drop/Drag_a_Stage.html',
                component: ComponentCreator('/docs/drag_and_drop/Drag_a_Stage.html', '086'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/drag_and_drop/Drag_an_Image.html',
                component: ComponentCreator('/docs/drag_and_drop/Drag_an_Image.html', '148'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/drag_and_drop/Drag_and_Drop.html',
                component: ComponentCreator('/docs/drag_and_drop/Drag_and_Drop.html', '4db'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/drag_and_drop/Drag_Events.html',
                component: ComponentCreator('/docs/drag_and_drop/Drag_Events.html', '5ff'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/drag_and_drop/Drop_Events.html',
                component: ComponentCreator('/docs/drag_and_drop/Drop_Events.html', 'de5'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/drag_and_drop/Simple_Drag_Bounds.html',
                component: ComponentCreator('/docs/drag_and_drop/Simple_Drag_Bounds.html', '69a'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Binding_Events.html',
                component: ComponentCreator('/docs/events/Binding_Events.html', 'f3a'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Cancel_Propagation.html',
                component: ComponentCreator('/docs/events/Cancel_Propagation.html', 'd8f'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Custom_Hit_Region.html',
                component: ComponentCreator('/docs/events/Custom_Hit_Region.html', 'a8d'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Desktop_and_Mobile.html',
                component: ComponentCreator('/docs/events/Desktop_and_Mobile.html', '76b'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Event_Delegation.html',
                component: ComponentCreator('/docs/events/Event_Delegation.html', '738'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Fire_Events.html',
                component: ComponentCreator('/docs/events/Fire_Events.html', 'acd'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Image_Events.html',
                component: ComponentCreator('/docs/events/Image_Events.html', 'cac'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Keyboard_Events.html',
                component: ComponentCreator('/docs/events/Keyboard_Events.html', 'bba'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Listen_for_Events.html',
                component: ComponentCreator('/docs/events/Listen_for_Events.html', 'a13'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Mobile_Events.html',
                component: ComponentCreator('/docs/events/Mobile_Events.html', '24c'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Mobile_Scrolling.html',
                component: ComponentCreator('/docs/events/Mobile_Scrolling.html', 'f6b'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Multi_Event.html',
                component: ComponentCreator('/docs/events/Multi_Event.html', '9b2'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Pointer_Events.html',
                component: ComponentCreator('/docs/events/Pointer_Events.html', '93b'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Remove_by_Name.html',
                component: ComponentCreator('/docs/events/Remove_by_Name.html', '1c8'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Remove_Event.html',
                component: ComponentCreator('/docs/events/Remove_Event.html', '013'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/events/Stage_Events.html',
                component: ComponentCreator('/docs/events/Stage_Events.html', 'd42'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Blur.html',
                component: ComponentCreator('/docs/filters/Blur.html', '5c2'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Brighten.html',
                component: ComponentCreator('/docs/filters/Brighten.html', '118'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Contrast.html',
                component: ComponentCreator('/docs/filters/Contrast.html', 'e18'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Custom_Filter.html',
                component: ComponentCreator('/docs/filters/Custom_Filter.html', '2c9'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Emboss.html',
                component: ComponentCreator('/docs/filters/Emboss.html', '5d4'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Enhance.html',
                component: ComponentCreator('/docs/filters/Enhance.html', '54d'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Grayscale.html',
                component: ComponentCreator('/docs/filters/Grayscale.html', 'f67'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/HSL.html',
                component: ComponentCreator('/docs/filters/HSL.html', 'cdd'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/HSV.html',
                component: ComponentCreator('/docs/filters/HSV.html', '434'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Invert.html',
                component: ComponentCreator('/docs/filters/Invert.html', 'f82'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Kaleidoscope.html',
                component: ComponentCreator('/docs/filters/Kaleidoscope.html', '092'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Mask.html',
                component: ComponentCreator('/docs/filters/Mask.html', '893'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Multiple_Filters',
                component: ComponentCreator('/docs/filters/Multiple_Filters', '4b4'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Multiple_Filters.html',
                component: ComponentCreator('/docs/filters/Multiple_Filters.html', '4dc'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Noise.html',
                component: ComponentCreator('/docs/filters/Noise.html', '5ec'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Pixelate.html',
                component: ComponentCreator('/docs/filters/Pixelate.html', 'a8f'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/RGB.html',
                component: ComponentCreator('/docs/filters/RGB.html', '9d8'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Sepia.html',
                component: ComponentCreator('/docs/filters/Sepia.html', '618'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Solarize.html',
                component: ComponentCreator('/docs/filters/Solarize.html', '1ea'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/filters/Threshold.html',
                component: ComponentCreator('/docs/filters/Threshold.html', '95e'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/groups_and_layers/Change_Containers.html',
                component: ComponentCreator('/docs/groups_and_layers/Change_Containers.html', '858'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/groups_and_layers/Groups.html',
                component: ComponentCreator('/docs/groups_and_layers/Groups.html', '0fe'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/groups_and_layers/Layering.html',
                component: ComponentCreator('/docs/groups_and_layers/Layering.html', 'ae7'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/groups_and_layers/zIndex.html',
                component: ComponentCreator('/docs/groups_and_layers/zIndex.html', '1fa'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/index.html',
                component: ComponentCreator('/docs/index.html', '211'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/overview.html',
                component: ComponentCreator('/docs/overview.html', '9b4'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/performance/All_Performance_Tips.html',
                component: ComponentCreator('/docs/performance/All_Performance_Tips.html', 'f17'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/performance/Avoid_Memory_Leaks.html',
                component: ComponentCreator('/docs/performance/Avoid_Memory_Leaks.html', '3ed'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/performance/Batch_Draw.html',
                component: ComponentCreator('/docs/performance/Batch_Draw.html', 'ba6'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/performance/Disable_Perfect_Draw.html',
                component: ComponentCreator('/docs/performance/Disable_Perfect_Draw.html', '01f'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/performance/Layer_Management.html',
                component: ComponentCreator('/docs/performance/Layer_Management.html', 'ca4'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/performance/Listening_False.html',
                component: ComponentCreator('/docs/performance/Listening_False.html', 'e03'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/performance/Optimize_Animation.html',
                component: ComponentCreator('/docs/performance/Optimize_Animation.html', 'c37'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/performance/Optimize_Strokes.html',
                component: ComponentCreator('/docs/performance/Optimize_Strokes.html', '915'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/performance/Shape_Caching.html',
                component: ComponentCreator('/docs/performance/Shape_Caching.html', '543'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/posts/Position_vs_Offset',
                component: ComponentCreator('/docs/posts/Position_vs_Offset', 'a53'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/posts/Tainted_Canvas',
                component: ComponentCreator('/docs/posts/Tainted_Canvas', 'e77'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/',
                component: ComponentCreator('/docs/react/', 'c52'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Access_Konva_Nodes',
                component: ComponentCreator('/docs/react/Access_Konva_Nodes', 'b6a'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Canvas_Export',
                component: ComponentCreator('/docs/react/Canvas_Export', 'df7'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Canvas_Portal',
                component: ComponentCreator('/docs/react/Canvas_Portal', '9cf'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Complex_Animations',
                component: ComponentCreator('/docs/react/Complex_Animations', '089'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Custom_Shape',
                component: ComponentCreator('/docs/react/Custom_Shape', '1c4'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/DOM_Portal',
                component: ComponentCreator('/docs/react/DOM_Portal', 'ff7'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Drag_And_Drop',
                component: ComponentCreator('/docs/react/Drag_And_Drop', '00f'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Drop_Image',
                component: ComponentCreator('/docs/react/Drop_Image', 'bb3'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Events',
                component: ComponentCreator('/docs/react/Events', '84c'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Filters',
                component: ComponentCreator('/docs/react/Filters', '732'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Free_Drawing',
                component: ComponentCreator('/docs/react/Free_Drawing', '520'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Images',
                component: ComponentCreator('/docs/react/Images', 'bf7'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Intro',
                component: ComponentCreator('/docs/react/Intro', 'd5b'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Shapes',
                component: ComponentCreator('/docs/react/Shapes', 'bb0'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Simple_Animations',
                component: ComponentCreator('/docs/react/Simple_Animations', 'a92'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Transformer',
                component: ComponentCreator('/docs/react/Transformer', '890'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/Undo-Redo',
                component: ComponentCreator('/docs/react/Undo-Redo', 'efb'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/react/zIndex',
                component: ComponentCreator('/docs/react/zIndex', 'bc2'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Animals_on_the_Beach_Game',
                component: ComponentCreator('/docs/sandbox/Animals_on_the_Beach_Game', 'a76'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Animation_Stress_Test',
                component: ComponentCreator('/docs/sandbox/Animation_Stress_Test', '9d8'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Canvas_Background',
                component: ComponentCreator('/docs/sandbox/Canvas_Background', 'f29'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Canvas_Context_Menu',
                component: ComponentCreator('/docs/sandbox/Canvas_Context_Menu', '150'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Canvas_Editor',
                component: ComponentCreator('/docs/sandbox/Canvas_Editor', 'e62'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Canvas_Scrolling',
                component: ComponentCreator('/docs/sandbox/Canvas_Scrolling', '09b'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Canvas_to_PDF',
                component: ComponentCreator('/docs/sandbox/Canvas_to_PDF', '3cf'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Collision_Detection',
                component: ComponentCreator('/docs/sandbox/Collision_Detection', '359'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Connected_Objects',
                component: ComponentCreator('/docs/sandbox/Connected_Objects', 'ecf'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Custom_Font',
                component: ComponentCreator('/docs/sandbox/Custom_Font', 'af0'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Drag_and_Drop_Multiple_Shapes',
                component: ComponentCreator('/docs/sandbox/Drag_and_Drop_Multiple_Shapes', '87a'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Drag_and_Drop_Stress_Test',
                component: ComponentCreator('/docs/sandbox/Drag_and_Drop_Stress_Test', 'ced'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Drop_DOM_Element',
                component: ComponentCreator('/docs/sandbox/Drop_DOM_Element', '5e3'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Editable_Text',
                component: ComponentCreator('/docs/sandbox/Editable_Text', 'd83'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Elastic_Stars',
                component: ComponentCreator('/docs/sandbox/Elastic_Stars', '239'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Expand_Images_on_Hover',
                component: ComponentCreator('/docs/sandbox/Expand_Images_on_Hover', '6e2'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Free_Drawing',
                component: ComponentCreator('/docs/sandbox/Free_Drawing', 'cff'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Gestures',
                component: ComponentCreator('/docs/sandbox/Gestures', 'd5e'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/GIF_On_Canvas',
                component: ComponentCreator('/docs/sandbox/GIF_On_Canvas', 'de3'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Image_Border',
                component: ComponentCreator('/docs/sandbox/Image_Border', '178'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Image_Border_Highlighting',
                component: ComponentCreator('/docs/sandbox/Image_Border_Highlighting', '3a1'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Image_Labeling',
                component: ComponentCreator('/docs/sandbox/Image_Labeling', 'ef8'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Image_Resize',
                component: ComponentCreator('/docs/sandbox/Image_Resize', 'fc1'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Interactive_Building_Map',
                component: ComponentCreator('/docs/sandbox/Interactive_Building_Map', '660'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Jumping_Bunnies',
                component: ComponentCreator('/docs/sandbox/Jumping_Bunnies', 'ecd'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Limited_Drag_And_Resize',
                component: ComponentCreator('/docs/sandbox/Limited_Drag_And_Resize', '14d'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Mirror_Canvas_Shape',
                component: ComponentCreator('/docs/sandbox/Mirror_Canvas_Shape', 'b12'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Modify_Curves_with_Anchor_Points',
                component: ComponentCreator('/docs/sandbox/Modify_Curves_with_Anchor_Points', '20c'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Modify_Shape_Color_on_Click',
                component: ComponentCreator('/docs/sandbox/Modify_Shape_Color_on_Click', 'd63'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Multi-touch_Scale_Shape',
                component: ComponentCreator('/docs/sandbox/Multi-touch_Scale_Shape', 'b4a'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Multi-touch_Scale_Stage',
                component: ComponentCreator('/docs/sandbox/Multi-touch_Scale_Stage', 'a97'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Native_Context_Access',
                component: ComponentCreator('/docs/sandbox/Native_Context_Access', 'c1c'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Nodes',
                component: ComponentCreator('/docs/sandbox/Nodes', 'c24'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Objects_Snapping',
                component: ComponentCreator('/docs/sandbox/Objects_Snapping', '494'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Physics_Simulator',
                component: ComponentCreator('/docs/sandbox/Physics_Simulator', '292'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Planets_Image_Map',
                component: ComponentCreator('/docs/sandbox/Planets_Image_Map', 'fab'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Quantum_Squiggle',
                component: ComponentCreator('/docs/sandbox/Quantum_Squiggle', '063'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Relative_Pointer_Position',
                component: ComponentCreator('/docs/sandbox/Relative_Pointer_Position', '340'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Resizing_Stress_Test',
                component: ComponentCreator('/docs/sandbox/Resizing_Stress_Test', 'fec'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Responsive_Canvas',
                component: ComponentCreator('/docs/sandbox/Responsive_Canvas', 'ffa'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Rich_Text',
                component: ComponentCreator('/docs/sandbox/Rich_Text', '0f7'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Scale_Image_To_Fit',
                component: ComponentCreator('/docs/sandbox/Scale_Image_To_Fit', 'b27'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Scroll_By_Edge_Drag',
                component: ComponentCreator('/docs/sandbox/Scroll_By_Edge_Drag', '29c'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Seats_Reservation',
                component: ComponentCreator('/docs/sandbox/Seats_Reservation', 'a0f'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Shape_Tango',
                component: ComponentCreator('/docs/sandbox/Shape_Tango', 'd9e'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Shape_Tooltips',
                component: ComponentCreator('/docs/sandbox/Shape_Tooltips', 'b0e'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Shapes_with_Tooltip',
                component: ComponentCreator('/docs/sandbox/Shapes_with_Tooltip', '444'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Simple_Window_Frame',
                component: ComponentCreator('/docs/sandbox/Simple_Window_Frame', '5bc'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Stage_Preview',
                component: ComponentCreator('/docs/sandbox/Stage_Preview', '116'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Star_Spinner',
                component: ComponentCreator('/docs/sandbox/Star_Spinner', '95d'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/SVG_On_Canvas',
                component: ComponentCreator('/docs/sandbox/SVG_On_Canvas', '3d8'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Transparent_Group',
                component: ComponentCreator('/docs/sandbox/Transparent_Group', '61d'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Video_On_Canvas',
                component: ComponentCreator('/docs/sandbox/Video_On_Canvas', 'e91'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Web_Worker',
                component: ComponentCreator('/docs/sandbox/Web_Worker', 'cf5'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Wheel_of_Fortune',
                component: ComponentCreator('/docs/sandbox/Wheel_of_Fortune', '3ec'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Window_Frame_Designer',
                component: ComponentCreator('/docs/sandbox/Window_Frame_Designer', '28d'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Zoom_Layer_On_hover',
                component: ComponentCreator('/docs/sandbox/Zoom_Layer_On_hover', '273'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/sandbox/Zooming_Relative_To_Pointer',
                component: ComponentCreator('/docs/sandbox/Zooming_Relative_To_Pointer', '555'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Basic_demo.html',
                component: ComponentCreator('/docs/select_and_transform/Basic_demo.html', 'ba4'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Centered_Scaling.html',
                component: ComponentCreator('/docs/select_and_transform/Centered_Scaling.html', 'ac6'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Force_Update.html',
                component: ComponentCreator('/docs/select_and_transform/Force_Update.html', '4b6'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Ignore_Stroke_On_Transform.html',
                component: ComponentCreator('/docs/select_and_transform/Ignore_Stroke_On_Transform.html', '8c4'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Keep_Ratio.html',
                component: ComponentCreator('/docs/select_and_transform/Keep_Ratio.html', '70e'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Resize_Limits.html',
                component: ComponentCreator('/docs/select_and_transform/Resize_Limits.html', 'a3a'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Resize_Snaps.html',
                component: ComponentCreator('/docs/select_and_transform/Resize_Snaps.html', 'b0d'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Resize_Text.html',
                component: ComponentCreator('/docs/select_and_transform/Resize_Text.html', '83a'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Rotation_Snaps.html',
                component: ComponentCreator('/docs/select_and_transform/Rotation_Snaps.html', 'ca3'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Stop_Transform.html',
                component: ComponentCreator('/docs/select_and_transform/Stop_Transform.html', '673'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Transform_Events.html',
                component: ComponentCreator('/docs/select_and_transform/Transform_Events.html', '00e'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Transformer_Complex_Styling.html',
                component: ComponentCreator('/docs/select_and_transform/Transformer_Complex_Styling.html', '0bb'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/select_and_transform/Transformer_Styling.html',
                component: ComponentCreator('/docs/select_and_transform/Transformer_Styling.html', '81e'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/selectors/Select_by_id.html',
                component: ComponentCreator('/docs/selectors/Select_by_id.html', '152'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/selectors/Select_by_Name.html',
                component: ComponentCreator('/docs/selectors/Select_by_Name.html', '22c'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/selectors/Select_by_Type.html',
                component: ComponentCreator('/docs/selectors/Select_by_Type.html', 'dc4'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Arc.html',
                component: ComponentCreator('/docs/shapes/Arc.html', 'a5f'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Arrow.html',
                component: ComponentCreator('/docs/shapes/Arrow.html', 'd43'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Circle.html',
                component: ComponentCreator('/docs/shapes/Circle.html', '40b'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Custom.html',
                component: ComponentCreator('/docs/shapes/Custom.html', '5d4'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Ellipse.html',
                component: ComponentCreator('/docs/shapes/Ellipse.html', '305'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Group.html',
                component: ComponentCreator('/docs/shapes/Group.html', '8e6'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Image.html',
                component: ComponentCreator('/docs/shapes/Image.html', '308'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Label.html',
                component: ComponentCreator('/docs/shapes/Label.html', '6b2'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Line_-_Blob.html',
                component: ComponentCreator('/docs/shapes/Line_-_Blob.html', '0ae'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Line_-_Polygon.html',
                component: ComponentCreator('/docs/shapes/Line_-_Polygon.html', '5cd'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Line_-_Simple_Line.html',
                component: ComponentCreator('/docs/shapes/Line_-_Simple_Line.html', '45f'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Line_-_Spline.html',
                component: ComponentCreator('/docs/shapes/Line_-_Spline.html', '329'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Line.html',
                component: ComponentCreator('/docs/shapes/Line.html', 'dd4'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Path.html',
                component: ComponentCreator('/docs/shapes/Path.html', '7ce'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Rect.html',
                component: ComponentCreator('/docs/shapes/Rect.html', '6b1'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/RegularPolygon.html',
                component: ComponentCreator('/docs/shapes/RegularPolygon.html', '2d9'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Ring.html',
                component: ComponentCreator('/docs/shapes/Ring.html', 'b46'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Sprite.html',
                component: ComponentCreator('/docs/shapes/Sprite.html', 'aa5'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Star.html',
                component: ComponentCreator('/docs/shapes/Star.html', '37e'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Text.html',
                component: ComponentCreator('/docs/shapes/Text.html', '575'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/TextPath.html',
                component: ComponentCreator('/docs/shapes/TextPath.html', 'c30'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/shapes/Wedge.html',
                component: ComponentCreator('/docs/shapes/Wedge.html', '6d1'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/styling/Blend_Mode.html',
                component: ComponentCreator('/docs/styling/Blend_Mode.html', '856'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/styling/Fill_Stroke_Order.html',
                component: ComponentCreator('/docs/styling/Fill_Stroke_Order.html', 'c3f'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/styling/Fill.html',
                component: ComponentCreator('/docs/styling/Fill.html', '3bf'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/styling/hide-and-show.html',
                component: ComponentCreator('/docs/styling/hide-and-show.html', '110'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/styling/Line_Join.html',
                component: ComponentCreator('/docs/styling/Line_Join.html', 'c75'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/styling/Mouse_Cursor.html',
                component: ComponentCreator('/docs/styling/Mouse_Cursor.html', '522'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/styling/Opacity.html',
                component: ComponentCreator('/docs/styling/Opacity.html', '13e'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/styling/Shadow.html',
                component: ComponentCreator('/docs/styling/Shadow.html', 'd10'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/styling/Stroke.html',
                component: ComponentCreator('/docs/styling/Stroke.html', '2ab'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/support.html',
                component: ComponentCreator('/docs/support.html', '9db'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/',
                component: ComponentCreator('/docs/svelte/', 'f6c'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Bindings',
                component: ComponentCreator('/docs/svelte/Bindings', '836'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Cache',
                component: ComponentCreator('/docs/svelte/Cache', '15f'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Custom_Shape',
                component: ComponentCreator('/docs/svelte/Custom_Shape', 'd4d'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Drag_And_Drop',
                component: ComponentCreator('/docs/svelte/Drag_And_Drop', 'd3a'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Events',
                component: ComponentCreator('/docs/svelte/Events', '0bc'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Filters',
                component: ComponentCreator('/docs/svelte/Filters', 'e03'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Images',
                component: ComponentCreator('/docs/svelte/Images', '622'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Konva_Node',
                component: ComponentCreator('/docs/svelte/Konva_Node', 'ac3'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Labels',
                component: ComponentCreator('/docs/svelte/Labels', '482'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Save_Load',
                component: ComponentCreator('/docs/svelte/Save_Load', '465'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Shapes',
                component: ComponentCreator('/docs/svelte/Shapes', '1b0'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Simple_Animations',
                component: ComponentCreator('/docs/svelte/Simple_Animations', '9e8'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/SvelteKit',
                component: ComponentCreator('/docs/svelte/SvelteKit', '822'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/Transformer',
                component: ComponentCreator('/docs/svelte/Transformer', 'db9'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/svelte/zIndex',
                component: ComponentCreator('/docs/svelte/zIndex', '8d2'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/tools.html',
                component: ComponentCreator('/docs/tools.html', 'dbd'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/tweens/All_Controls.html',
                component: ComponentCreator('/docs/tweens/All_Controls.html', '568'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/tweens/All_Easings.html',
                component: ComponentCreator('/docs/tweens/All_Easings.html', '5c5'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/tweens/Common_Easings.html',
                component: ComponentCreator('/docs/tweens/Common_Easings.html', '020'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/tweens/Complex_Tweening.html',
                component: ComponentCreator('/docs/tweens/Complex_Tweening.html', '053'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/tweens/Finish_Event',
                component: ComponentCreator('/docs/tweens/Finish_Event', '6c0'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/tweens/Linear_Easing.html',
                component: ComponentCreator('/docs/tweens/Linear_Easing.html', '6fb'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/tweens/Tween_Filter.html',
                component: ComponentCreator('/docs/tweens/Tween_Filter.html', '027'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/vue/',
                component: ComponentCreator('/docs/vue/', '323'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/vue/Cache',
                component: ComponentCreator('/docs/vue/Cache', '88f'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/vue/Custom_Shape',
                component: ComponentCreator('/docs/vue/Custom_Shape', '6bd'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/vue/Drag_And_Drop',
                component: ComponentCreator('/docs/vue/Drag_And_Drop', 'd45'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/vue/Events',
                component: ComponentCreator('/docs/vue/Events', '377'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/vue/Filters',
                component: ComponentCreator('/docs/vue/Filters', 'f30'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/vue/Images',
                component: ComponentCreator('/docs/vue/Images', '753'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/vue/Save-Load',
                component: ComponentCreator('/docs/vue/Save-Load', '088'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/vue/Shapes',
                component: ComponentCreator('/docs/vue/Shapes', '9d2'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/vue/Simple_Animations',
                component: ComponentCreator('/docs/vue/Simple_Animations', '63a'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/vue/Transformer',
                component: ComponentCreator('/docs/vue/Transformer', '09f'),
                exact: true,
                sidebar: "tutorialsSidebar"
              },
              {
                path: '/docs/vue/zIndex',
                component: ComponentCreator('/docs/vue/zIndex', '759'),
                exact: true,
                sidebar: "tutorialsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
