import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Layout from "components/Layout";
import { getProfiles, getProfileSkills } from "integrations/directus";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// get alll profiles, optionally filter by URL query
export async function getServerSideProps(context) {
	const { skillId } = context.query;
	const skillFilter = skillId ? parseInt(skillId, 10) : -1; // Default to -1 for all profiles

	const profilesResponse = await getProfiles(skillFilter); // Fetch profiles based on skill ID
	const profiles = profilesResponse.data || profilesResponse;

	const skillsResponse = await getProfileSkills();
	const skills = skillsResponse.data || skillsResponse;

	return { props: { profiles, skills, selectedSkill: skillFilter.toString() } }; // Pass selected skill ID as a string for the dropdown
}

// this takes the existing connectedkw colour and makes slight changes to get multicoloured skill thingies
const getRandomColor = () => {
	const baseRed = 216;
	const baseGreen = 31;
	const baseBlue = 91;

	// amount of variation
	const diff = 50;
  
	const redMutation = Math.floor(Math.random() * diff * 2 - diff);
	const greenMutation = Math.floor(Math.random()* diff * 2 - diff); 
	const blueMutation = Math.floor(Math.random()* diff * 2 - diff); 
  
	// Ensure within RGB range 0-255
	const red = Math.min(Math.max(baseRed + redMutation, 0), 255);
	const green = Math.min(Math.max(baseGreen + greenMutation, 0), 255);
	const blue = Math.min(Math.max(baseBlue + blueMutation, 0), 255);
  
	return `rgb(${red}, ${green}, ${blue})`;
};
  
export default function ProfilePage({ profiles, skills }) {
	const directusURL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
	const router = useRouter();
	// Get skillId from the query
	const { skillId } = router.query;

	// defaults to -1 which applies no filter and shows all profiles
	const [selected, setSelected] = useState(skillId || "-1"); 

	useEffect(() => {
		setSelected(skillId || "-1"); 
	}, [skillId]);

	const handleSkillChange = (event) => {
		const skillId = event.target.value;
		setSelected(skillId);

		// Update the URL without reloading
		router.push({
			pathname: "/auth/profiles/profiles",
			query: { skillId },
		});
	};
  
	return (
	  <Layout color="rainbow">
		<section className="bg-slate-100 md:py-12 pt-12 pb-12 w-full">
		  <h1 className="text-3xl font-bold mb-8 text-center">Profiles</h1>
		  
		  {/* Skill Search Bar - Barebones for now, needs improvement*/}
		  <div className="mb-4 flex justify-center">
		  <select
				value={selected}
				onChange={handleSkillChange}
				className="p-2 rounded-lg border border-gray-300"
			>
					<option value="-1">All Skills</option>
					{skills.map((skill) => (
						<option key={skill.id} value={skill.id}>
							{skill.name}
						</option>
					))}
				</select>
		  </div>
  
		  {profiles.length === 0 ? (
			<p className="text-center text-gray-600">No profiles found.</p>
		  ) : (
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
			  {profiles.map((profile) => {
				const avatarId = profile.profile_picture;
				const avatarURL = avatarId ? `${directusURL}/assets/${avatarId}` : null;

				// the bio returns HTML - this is just a safety so people can't inject scripts with their bio
				const cleanBio = DOMPurify.sanitize(profile.bio, {
					FORBID_ATTR: ['style'],
					ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li']
				});
  
				// Map skill IDs to their actual names
				const profileSkillNames = profile.skills
				  ? profile.skills
					  .map((skillId) => {
						const skillObj = skills.find((s) => s.id === skillId);
						return skillObj ? skillObj.name : null;
					  })
					  .filter(Boolean)
				  : [];
  
				return (
				  <li key={profile.id}>
					<Link href={`/auth/profiles/${profile.id}`} className="block no-underline">
					  <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
						<div className="flex items-center space-x-4 mb-2">
						  <div className="w-20 h-20 relative rounded-full overflow-hidden">
							{avatarURL ? (
							  <Image
								src={avatarURL}
								alt={`${profile.name}'s avatar`}
								fill
								className="object-cover"
							  />
							) : (
							  <div className="w-full h-full bg-gray-300" />
							)}
						  </div>
						  <div>
							<h2 className="text-xl font-semibold">{profile.name}</h2>
							<div className="mt-1 flex items-center space-x-2">
							  <span className="text-gray-500 text-xs">
								{profile.city || "No City Listed"}
							  </span>
							  <span className="text-gray-500 text-xs">•</span>
							  {profile.is_verified ? (
								<span className="text-gray-500 text-xs">
								  Verified
								</span>
							  ) : (
								<span className="text-gray-500 text-xs">
								  Not Verified
								</span>
							  )}
							</div>
						  </div>
						</div>
  
						<div
						  className="mb-2 text-gray-700"
						  dangerouslySetInnerHTML={{ __html: cleanBio }}
						/>
  
						<div className="mt-4 flex flex-wrap gap-2">
						  {profileSkillNames.length > 0 ? (
							profileSkillNames.map((skillName, index) => (
							  <span
								key={index}
								style={{ backgroundColor: getRandomColor() }}
								className="inline-flex items-center text-white px-2 py-1 text-xs font-semibold rounded-full"
							  >
								{skillName}
							  </span>
							))
						  ) : (
							<span className="text-xs text-gray-500">No skills</span>
						  )}
						</div>
					  </div>
					</Link>
				  </li>
				);
			  })}
			</ul>
		  )}
		</section>
	  </Layout>
	);
  }
