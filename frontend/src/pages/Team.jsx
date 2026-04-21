import { useEffect, useState, useRef } from 'react';
import { Mail, Phone, Users, Briefcase, Instagram, Twitter, Linkedin, ArrowUpRight, X, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { contentAPI } from '../services/api';
import { useRegion } from '../context/RegionContext';

function calculateAge(dob) {
    if (!dob) return null;
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age -= 1;
    }
    return age;
}

const deptColors = {
    'Leadership': { gradient: 'from-purple-600 to-indigo-600', light: 'from-purple-50 to-indigo-50', dark: 'from-purple-900/40 to-indigo-900/40', accent: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
    'Programs': { gradient: 'from-blue-600 to-cyan-600', light: 'from-blue-50 to-cyan-50', dark: 'from-blue-900/40 to-cyan-900/40', accent: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
    'Outreach': { gradient: 'from-orange-600 to-rose-600', light: 'from-orange-50 to-rose-50', dark: 'from-orange-900/40 to-rose-900/40', accent: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' },
    'Technology': { gradient: 'from-green-600 to-emerald-600', light: 'from-green-50 to-emerald-50', dark: 'from-green-900/40 to-emerald-900/40', accent: 'text-green-600 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
    'Operations': { gradient: 'from-pink-600 to-rose-600', light: 'from-pink-50 to-rose-50', dark: 'from-pink-900/40 to-rose-900/40', accent: 'text-pink-600 dark:text-pink-400', border: 'border-pink-200 dark:border-pink-800' },
    'Communications': { gradient: 'from-red-600 to-orange-600', light: 'from-red-50 to-orange-50', dark: 'from-red-900/40 to-orange-900/40', accent: 'text-red-600 dark:text-red-400', border: 'border-red-200 dark:border-red-800' }
};

const getColorScheme = (dept) => deptColors[dept] || { gradient: 'from-indigo-600 to-purple-600', light: 'from-indigo-50 to-purple-50', dark: 'from-indigo-900/40 to-purple-900/40', accent: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-800' };

function Team() {
    const { region } = useRegion();
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedMember, setSelectedMember] = useState(null);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await contentAPI.getTeamMembers(region);
                const members = response.data.members || [];
                const enriched = members.map((member) => ({
                    ...member,
                    age: member.age ?? calculateAge(member.date_of_birth)
                }));
                setTeamMembers(enriched);

                const depts = ['All', ...new Set(enriched
                    .filter(m => m.department && m.is_active !== false)
                    .map(m => m.department)
                )].sort((a, b) => a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b));
                setDepartments(depts);
            } catch (error) {
                console.error('Failed to fetch team members:', error);
                setTeamMembers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [region]);

    const filteredMembers = selectedDepartment === 'All' 
        ? teamMembers.filter(m => m.is_active !== false)
        : teamMembers.filter(m => m.department === selectedDepartment && m.is_active !== false);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedMember]);

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen">
            <Navbar />

            {/* Custom Hero Layer */}
            <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gray-50 dark:bg-gray-950">
                {/* Background Details */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 to-blue-500/20 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 translate-x-1/3 -translate-y-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/20 to-orange-500/20 dark:from-pink-900/30 dark:to-orange-900/30 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-70 -translate-x-1/4 translate-y-1/3"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 px-4 py-2 shadow-sm animate-fade-in-up">
                        <Users size={16} className="text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200">Our Brilliant Team</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Visionaries</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-900 dark:text-gray-100 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Exceptional talent united by purpose. Together, we are driving impact and shaping the future across regions.
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16 relative z-20">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20 space-y-4">
                        <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin"></div>
                        <p className="text-gray-900 dark:text-gray-100 font-semibold uppercase tracking-widest text-sm">Loading Members...</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Dynamic Sticky Filter Bar */}
                        <div className="sticky top-24 z-30 flex items-center gap-3 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                            {departments.map((dept) => {
                                const colors = dept === 'All' ? { gradient: 'from-gray-800 to-gray-900 dark:from-white dark:to-gray-200', light: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700', accent: 'text-gray-900 dark:text-white' } : getColorScheme(dept);
                                const isSelected = selectedDepartment === dept;

                                return (
                                    <button
                                        key={dept}
                                        onClick={() => setSelectedDepartment(dept)}
                                        className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 backdrop-blur-md border shadow-sm flex items-center gap-2
                                            ${isSelected 
                                                ? `bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900 shadow-xl scale-105` 
                                                : `bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:border-purple-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:-translate-y-1`
                                            }`}
                                    >
                                        {dept !== 'All' && <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors.gradient}`}></span>}
                                        {dept}
                                    </button>
                                );
                            })}
                        </div>
                        
                        {/* Team Grid */}
                        {filteredMembers.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
                                {filteredMembers.map((member, idx) => {
                                    const colors = getColorScheme(member.department);
                                    return (
                                        <button
                                            key={member.id}
                                            onClick={() => setSelectedMember(member)}
                                            className="group relative flex flex-col text-left bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:shadow-none hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                                            style={{ animationDelay: `${(idx % 12) * 50}ms` }}
                                        >
                                            {/* Top Image Box */}
                                            <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 mb-5">
                                                {member.photo_url ? (
                                                    <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-7xl font-black text-gray-300 dark:text-gray-600">{member.name.charAt(0)}</span>
                                                    </div>
                                                )}
                                                
                                                {/* Department Pill overlay inside image */}
                                                {member.department && (
                                                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1 shadow-sm">
                                                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.gradient}`}></span>
                                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.accent}`}>{member.department}</span>
                                                    </div>
                                                )}

                                                {/* Social Links Reveal Overlay */}
                                                {member.social_links && Object.values(member.social_links).some(Boolean) && (
                                                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                        {member.social_links.linkedin && (
                                                            <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors">
                                                                <Linkedin size={14} />
                                                            </div>
                                                        )}
                                                        {member.social_links.twitter && (
                                                            <div className="w-8 h-8 rounded-full bg-white text-sky-500 flex items-center justify-center shadow-lg hover:bg-sky-50 transition-colors">
                                                                <Twitter size={14} />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Details Section */}
                                            <div className="px-2 pb-2">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{member.name}</h3>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">{member.role}</p>
                                                
                                                {/* View Profile Indicator */}
                                                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
                                                    <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Profile</span>
                                                    <ArrowUpRight size={14} className="text-purple-600 dark:text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-24 rounded-[3rem] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40 shadow-sm mx-4">
                                <Users size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                                <p className="text-xl font-bold text-gray-900 dark:text-white">No members found</p>
                                <p className="text-gray-900 dark:text-gray-100 mt-2">Check back later or select a different department.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <Footer />

            {/* Profile Overlay Modal */}
            {selectedMember && (
                <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 lg:p-8">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in"
                        onClick={() => setSelectedMember(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-4xl max-h-full flex flex-col bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.2)] overflow-hidden animate-scale-up z-10 transition-all">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedMember(null); }}
                            className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/50 dark:bg-black/50 text-gray-900 dark:text-white flex items-center justify-center hover:bg-white dark:hover:bg-black hover:scale-110 hover:rotate-90 transition-all backdrop-blur-md shadow-lg"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex-1 overflow-y-auto w-full max-h-[85vh] no-scrollbar relative">
                            <div className="flex flex-col md:flex-row min-h-full">
                                {/* Left Visual Column */}
                                <div className="w-full md:w-[45%] h-80 md:h-auto md:min-h-[500px] relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex-shrink-0">
                                    {selectedMember.photo_url ? (
                                        <img src={selectedMember.photo_url} alt={selectedMember.name} className="absolute inset-0 w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-[10rem] font-black text-gray-300 dark:text-gray-600">
                                            {selectedMember.name.charAt(0)}
                                        </div>
                                    )}
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent md:hidden pointer-events-none"></div>
                                </div>

                                {/* Right Content Column */}
                                <div className="p-8 md:p-12 w-full flex flex-col bg-white dark:bg-gray-900 relative">
                                    <div className="mb-8">
                                        {selectedMember.department && (
                                            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold uppercase tracking-wider text-xs border border-gray-100 dark:border-gray-700">
                                                <Briefcase size={14} className="text-purple-600 dark:text-purple-400" /> {selectedMember.department}
                                            </div>
                                        )}
                                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-[1.1]">{selectedMember.name}</h2>
                                        <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">{selectedMember.role}</p>
                                    </div>

                                    {/* Badges Row */}
                                    {(selectedMember.age || selectedMember.date_of_birth) && (
                                        <div className="flex flex-wrap gap-4 mb-8">
                                            {selectedMember.age && (
                                                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
                                                    <div className="text-3xl font-black text-gray-900 dark:text-white">{selectedMember.age}</div>
                                                    <div className="text-xs font-bold text-gray-700 dark:text-gray-100 uppercase tracking-widest leading-tight">Years<br/>Old</div>
                                                </div>
                                            )}
                                            {selectedMember.date_of_birth && (
                                                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                                    <span className="text-xl">🎂</span> 
                                                    <span>Born {new Date(selectedMember.date_of_birth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Bio */}
                                    {selectedMember.description && (
                                        <div className="prose prose-purple dark:prose-invert max-w-none mb-10">
                                            <p className="text-gray-900 dark:text-gray-100 leading-[1.8] text-base md:text-lg">
                                                {selectedMember.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Contact & Socials Footing */}
                                    <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
                                        <div className="flex gap-4">
                                            {selectedMember.contact_email && (
                                                <a href={`mailto:${selectedMember.contact_email}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 hover:text-purple-600 dark:text-gray-100 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold transition-all">
                                                    <Mail size={18} /> Email
                                                </a>
                                            )}
                                            {selectedMember.contact_phone && (
                                                <a href={`tel:${selectedMember.contact_phone}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 hover:text-purple-600 dark:text-gray-100 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold transition-all">
                                                    <Phone size={18} /> Call
                                                </a>
                                            )}
                                        </div>

                                        {selectedMember.social_links && Object.values(selectedMember.social_links).some(Boolean) && (
                                            <div className="flex gap-3">
                                                {selectedMember.social_links.linkedin && (
                                                    <a href={selectedMember.social_links.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/20 dark:hover:border-blue-800 hover:scale-110 transition-all shadow-sm">
                                                        <Linkedin size={20} />
                                                    </a>
                                                )}
                                                {selectedMember.social_links.twitter && (
                                                    <a href={selectedMember.social_links.twitter} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-sky-500 hover:bg-sky-50 hover:border-sky-200 dark:hover:bg-sky-900/20 dark:hover:border-sky-800 hover:scale-110 transition-all shadow-sm">
                                                        <Twitter size={20} />
                                                    </a>
                                                )}
                                                {selectedMember.social_links.instagram && (
                                                    <a href={selectedMember.social_links.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-pink-600 hover:bg-pink-50 hover:border-pink-200 dark:hover:bg-pink-900/20 dark:hover:border-pink-800 hover:scale-110 transition-all shadow-sm">
                                                        <Instagram size={20} />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Team;
