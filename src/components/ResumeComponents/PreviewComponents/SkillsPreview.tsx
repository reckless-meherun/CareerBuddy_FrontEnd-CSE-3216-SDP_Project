import React from 'react';

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="mb-2 font-bold text-center text-sm"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="gap-3 grid grid-cols-2 my-4">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className="flex justify-between items-center my-2">
            <h2 className="text-xs">{skill.name}</h2>
            <div className="bg-gray-200 rounded w-[120px] h-2 overflow-hidden">
              <div
                className="h-2"
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: skill?.rating * 20 + '%'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
