CREATE proc [dbo].[PageTranslations_Select_PageByLanguageV2]
			@LanguageId int

as

/* <--- TEST CODE SELECTBYLANGUAGE --->

DECLARE
		 @LanguageId int = 506

EXECUTE [dbo].[PageTranslations_Select_PageByLanguageV2]
		 @LanguageId

   <--- TEST CODE SELECTBYLANGUAGE ---> */

BEGIN

SELECT 
		 translation.Id
		,Link
		,Language =		(
						 SELECT	 Id
								,Code
								,Name
						FROM dbo.Languages
						WHERE Id = translation.LanguageId
						FOR JSON AUTO
						)
		,pageSection = (
						 SELECT	DISTINCT Id
								,Section
								,component 
								,pageTranslationId
								,keyValues =	(
												 SELECT  pSK.Id as sectionKeyId
														,KeyName as sectionName
														,pSC.Text as KeyContent
														,pSC.Id as contentId
												 FROM dbo.PageSectionKeys as pSK inner join dbo.PageSectionContent as pSC
												 ON pSC.PageSectionKeyId = pSK.Id
												 WHERE pSC.LanguageId = @LanguageId AND pSK.PageSectionId = pS.Id
												 FOR JSON PATH 
												)
						 FROM dbo.PageSection as pS
						 WHERE PageTranslationId = translation.Id
						 FOR JSON AUTO
						)

  FROM [dbo].[PageTranslations] as translation
  WHERE LanguageId = @LanguageId

END
GO
